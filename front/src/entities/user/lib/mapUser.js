export function mapUser(dto) {
    return {
        id: dto.id,
        login: dto.login,
        password: dto.password,
        role: dto.role
    }
}

export function mapUserList(dto) {
    return dto.map((user) => mapUser(user));
}