export interface QuestResponse {
    Date : Date,
    Quest : Quest
}

export interface Quest {
    Id: number,
    Title: string,
    Description: string
}