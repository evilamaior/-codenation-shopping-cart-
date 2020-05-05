const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

const getShoppingCart = (ids, productsList) => {
	const data = productsList.filter(products => ids.includes(products.id));
	// console.log(data);

	const products = data.map(products => ({name: products.name, category: products.category}));
	// console.log(products);

	const category = data.reduce((acc, current) => {
		if(!acc.includes(current.category)) {
			acc.push(current.category);
		};
		return acc
	}, []);
	// console.log("category", category);

	const promotion = promotions[category.length - 1];
	// console.log("promotion", promotion);

	const totalPriceWithDiscount = data.reduce((acc, current) => {
		const discount = current.promotions.find( ({ looks }) => looks.includes(promotion));
		// console.log("discount", discount);

		return discount ? acc + discount.price : acc + current.regularPrice
	}, 0);
	// console.log("totalPriceWithDiscount", totalPriceWithDiscount);

	const regularPrice = data.reduce((acc, current) => {
		return acc + current.regularPrice
	}, 0);
	// console.log("regularPrice", regularPrice);

	const discountValue = regularPrice - totalPriceWithDiscount;
	// console.log("discountValue", discountValue);

	const discountPercentage = discountValue * 100 / regularPrice;

	return {
		products,
		promotion,
		totalPrice: totalPriceWithDiscount.toFixed(2),
		discountValue: discountValue.toFixed(2),
		discount: discountPercentage.toFixed(2) + "%"
	}
}

module.exports = { getShoppingCart };
