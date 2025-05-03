
export interface ProjectRequest {
    tenantId: string;
    name: string;
    description: string;
}

export interface ProjectResponse {
    id: number;
    tenantId: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

