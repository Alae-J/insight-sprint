export interface MeetingUser {
    id: number;
    fullName: string;
}

export interface MeetingSummary {
    id: number;
    summaryMd: string;
    actionItemsJson: string;
    risksJson: string;
    modelName: string;
    createdAt: string;
}

export interface MeetingResponse {
    id: number;
    title: string;
    rawNotesMd: string;
    createdAt: string;
    projectId: number;
    creator: MeetingUser;
    attendees: MeetingUser[];
    summary?: MeetingSummaryResponseDTO;
}

export interface MeetingUserDTO {
    id: number;
    fullName: string;
}

export interface MeetingSummaryResponseDTO {
    summaryMd: string;
    actionItemsJson: string;
    risksJson: string;
}
