export function mapMessage(dto) {
    return {
        id: dto.id,
        type: dto.type,
        content: dto.content,
        date: dto.date,
        from: dto.from,
    }
}

export function mapMessageList(dto) {
    return dto.map((message) => mapMessage(message));
}