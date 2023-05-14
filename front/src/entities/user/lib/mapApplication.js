import { mapUser } from "./mapUser";

export function mapApplication(dto) {
    return {
        ...mapUser(dto),
        role: "client"
    }
}

export function mapApplicationList(dto) {
    return dto.map((application) => mapApplication(application));
}