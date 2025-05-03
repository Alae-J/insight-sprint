package com.ollama.ollama.ai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
@Slf4j
public class AIService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${spring.ai.ollama.base-url}")
    private String baseUrl;

    @Value("${spring.ai.ollama.chat.options.model}")
    private String model;

    private final WebClient webClient;

    public AIService(@Value("${spring.ai.ollama.base-url}") String baseUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    // Method to generate a clean summary without extra text
    public String generateSummary(String meetingText) {
        return sendPromptToAI("Summarize the following meeting notes concisely, without any introduction or unnecessary text:\n\n" + meetingText);
    }

    // Method to extract action items without the intro
    public String extractActionItems(String summary) {
        return sendPromptToAI("Extract the action items from the following summary. Provide only the action items, without any introduction or explanation:\n\n" + summary);
    }

    // Method to extract risks with a specific prompt
    public String extractRisks(String summary) {
        return sendPromptToAI("Extract any mentioned or implied risks from the following summary. List the risks clearly, without any extra text:\n\n" + summary);
    }

    // Method to send the prompt to the AI and receive the response
    private String sendPromptToAI(String prompt) {
        try {
            // Build the request JSON structure
            ObjectNode message = objectMapper.createObjectNode();
            message.put("role", "user");
            message.put("content", prompt);
    
            ArrayNode messages = objectMapper.createArrayNode();
            messages.add(message);
    
            ObjectNode payload = objectMapper.createObjectNode();
            payload.put("model", model);
            payload.set("messages", messages);
            payload.put("stream", false); // Not streaming anymore
    
            // Send request and get a single response (not Flux)
            String response = webClient.post()
                    .uri("/api/chat")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(payload.toString())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
    
            // Parse and extract the assistant message content
            JsonNode root = objectMapper.readTree(response);
            return cleanAIResponse(root.path("message").path("content").asText());
    
        } catch (Exception e) {
            throw new RuntimeException("Failed to communicate with AI", e);
        }
    }
    

    // Remove unnecessary introductory text from the AI's response
    private String cleanAIResponse(String raw) {
        // Clean the introductory text like "Here is the summary" or "Here are the action items"
        return raw.replaceFirst("(?i)^(here (is|are) (a|the) [^:]*:)", "").trim();
    }
}
