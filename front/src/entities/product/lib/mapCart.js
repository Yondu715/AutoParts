import { mapProduct } from "./mapProduct";

export function mapCart(dto){
    return {
        ...mapProduct(dto.product),
        id: dto.id
    }
}

export function mapCartList(dto){
    return dto.map((cart) => mapCart(cart));
}