export function mapProduct(productDto){
    return {
        id: productDto.id,
        name: productDto.name,
        sellerName: productDto.sellerName,
        model: productDto.name,
        brand: productDto.brand,
        price: productDto.price,
        date: productDto.date,
        image: productDto.image
    }
}

export function mapProductList(productDtoList){
    return productDtoList.map((product) => mapProduct(product));
}