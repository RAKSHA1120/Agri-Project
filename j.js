document.getElementById("categorySelect").addEventListener("change", function () {
    // Clear the product input and suggestions when a new category is selected
    document.getElementById("productName").value = "";
    document.getElementById("suggestions").innerHTML = "";

    const category = this.value;
    filterProductsByCategory(category);
});

document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent the form from refreshing the page

    const productName = document.getElementById("productName").value.toLowerCase().trim();
    const category = document.getElementById("categorySelect").value;

    // Check if a category is selected
    if (!category) {
        alert("Please select a category first.");
        return;
    }

    // Filter and show suggestions based on input
    const filteredSuggestions = getProductSuggestions(category, productName);
    displaySuggestions(filteredSuggestions);

    // Handle selected product
    const productData = getProductData(category, productName);
    displayProductData(productData);
});

// Mock dataset with categories
const allProductData = {
    grains: {
            rice: {
                category: "Grains",
                best_time: "Monsoon (June to September)",
                best_location: "Punjab, Uttar Pradesh, West Bengal, Tamil Nadu",
                historical_prices: [30, 35, 40, 45, 50, 55, 60]
            },
            wheat: {
                category: "Grains",
                best_time: "Winter (November to March)",
                best_location: "Punjab, Haryana, Uttar Pradesh, Madhya Pradesh",
                historical_prices: [25, 30, 35, 40, 45, 50, 55]
            },
            maize: {
                category: "Grains",
                best_time: "Summer (March to June)",
                best_location: "Bihar, Madhya Pradesh, Uttar Pradesh, Karnataka",
                historical_prices: [25, 30, 35, 40, 45, 50, 55]
            },
            barley: {
                category: "Grains",
                best_time: "Winter (October to February)",
                best_location: "Rajasthan, Uttar Pradesh, Punjab",
                historical_prices: [35, 40, 45, 50, 55, 60, 65]
            },
            oats: {
                category: "Grains",
                best_time: "Winter (November to March)",
                best_location: "Himachal Pradesh, Jammu & Kashmir, Uttarakhand",
                historical_prices: [50, 55, 60, 65, 70, 75, 80]
            },
            pearl_millet: {
                category: "Grains",
                best_time: "Summer (March to June)",
                best_location: "Rajasthan, Maharashtra, Gujarat, Haryana",
                historical_prices: [20, 25, 30, 35, 40, 45, 50]
            },
            finger_millet: {
                category: "Grains",
                best_time: "Monsoon (June to September)",
                best_location: "Karnataka, Tamil Nadu, Andhra Pradesh",
                historical_prices: [25, 30, 35, 40, 45, 50, 55]
            },
            sorghum: {
                category: "Grains",
                best_time: "Summer (March to June)",
                best_location: "Maharashtra, Karnataka, Rajasthan, Madhya Pradesh",
                historical_prices: [30, 35, 40, 45, 50, 55, 60]
            },
            quinoa: {
                category: "Grains",
                best_time: "Autumn (September to November)",
                best_location: "Himachal Pradesh, Uttarakhand",
                historical_prices: [200, 220, 240, 260, 280, 300, 320]
            },
            rye: {
                category: "Grains",
                best_time: "Winter (October to February)",
                best_location: "Uttarakhand, Himachal Pradesh",
                historical_prices: [80, 90, 100, 110, 120, 130, 140]
            },
            buckwheat: {
                category: "Grains",
                best_time: "Autumn (September to November)",
                best_location: "Uttarakhand, Himachal Pradesh",
                historical_prices: [100, 110, 120, 130, 140, 150, 160]
            }
    },
    fruits: {
        oranges: {
            category: "Fruits",
            best_time: "Winter (November to February)",
            best_location: "Nagpur, Maharashtra, Andhra Pradesh",
            historical_prices: [50, 55, 60, 65, 70, 75, 80]
        },
        lemons: {
            category: "Fruits",
            best_time: "Winter (November to February)",
            best_location: "Maharashtra, Gujarat, Tamil Nadu",
            historical_prices: [40, 45, 50, 55, 60, 65, 70]
        },
        limes: {
            category: "Fruits",
            best_time: "Summer (March to May)",
            best_location: "Maharashtra, Gujarat, Tamil Nadu",
            historical_prices: [30, 35, 40, 45, 50, 55, 60]
        },
        grapefruits: {
            category: "Fruits",
            best_time: "Winter (November to February)",
            best_location: "Nagpur, Andhra Pradesh",
            historical_prices: [60, 65, 70, 75, 80, 85, 90]
        },
        strawberries: {
            category: "Fruits",
            best_time: "Winter (November to March)",
            best_location: "Maharashtra, Himachal Pradesh, Uttar Pradesh",
            historical_prices: [120, 130, 140, 150, 160, 170, 180]
        },
        blueberries: {
            category: "Fruits",
            best_time: "Summer (June to August)",
            best_location: "Himachal Pradesh, Jammu & Kashmir",
            historical_prices: [300, 320, 340, 360, 380, 400, 420]
        },
        raspberries: {
            category: "Fruits",
            best_time: "Summer (June to August)",
            best_location: "Himachal Pradesh, Jammu & Kashmir",
            historical_prices: [150, 160, 170, 180, 190, 200, 210]
        },
        cherries: {
            category: "Fruits",
            best_time: "Summer (May to June)",
            best_location: "Kashmir, Himachal Pradesh",
            historical_prices: [200, 220, 240, 260, 280, 300, 320]
        },
        apricots: {
            category: "Fruits",
            best_time: "Summer (May to June)",
            best_location: "Kashmir, Himachal Pradesh, Ladakh",
            historical_prices: [180, 190, 200, 210, 220, 230, 240]
        },
        peaches: {
            category: "Fruits",
            best_time: "Summer (June to August)",
            best_location: "Himachal Pradesh, Jammu & Kashmir",
            historical_prices: [150, 160, 170, 180, 190, 200, 210]
        },
        bananas: {
            category: "Fruits",
            best_time: "All year round",
            best_location: "Kerala, Tamil Nadu, Maharashtra",
            historical_prices: [30, 35, 40, 45, 50, 55, 60]
        },
        pineapples: {
            category: "Fruits",
            best_time: "Summer (March to May)",
            best_location: "Kerala, Tamil Nadu, Karnataka",
            historical_prices: [60, 65, 70, 75, 80, 85, 90]
        },
        mangoes: {
            category: "Fruits",
            best_time: "Summer (March to May)",
            best_location: "Maharashtra, Uttar Pradesh, Andhra Pradesh",
            historical_prices: [70, 72, 74, 76, 78, 80, 82]
        },
        papayas: {
            category: "Fruits",
            best_time: "All year round",
            best_location: "Kerala, Maharashtra, Andhra Pradesh",
            historical_prices: [40, 45, 50, 55, 60, 65, 70]
        },
        avocados: {
            category: "Fruits",
            best_time: "Winter (October to February)",
            best_location: "Tamil Nadu, Maharashtra, Kerala",
            historical_prices: [200, 210, 220, 230, 240, 250, 260]
        },
        apples: {
            category: "Fruits",
            best_time: "Autumn (September to November)",
            best_location: "Himachal Pradesh, Jammu & Kashmir",
            historical_prices: [80, 85, 90, 95, 100, 105, 110]
        },
        pears: {
            category: "Fruits",
            best_time: "Autumn (September to November)",
            best_location: "Himachal Pradesh, Jammu & Kashmir",
            historical_prices: [120, 130, 140, 150, 160, 170, 180]
        },
        grapes: {
            category: "Fruits",
            best_time: "Summer (March to June)",
            best_location: "Maharashtra, Karnataka, Tamil Nadu",
            historical_prices: [60, 65, 70, 75, 80, 85, 90]
        },
        watermelon: {
            category: "Fruits",
            best_time: "Summer (March to May)",
            best_location: "Maharashtra, Gujarat, Andhra Pradesh",
            historical_prices: [25, 30, 35, 40, 45, 50, 55]
        },
        cantaloupe: {
            category: "Fruits",
            best_time: "Summer (April to June)",
            best_location: "Punjab, Haryana, Uttar Pradesh",
            historical_prices: [40, 45, 50, 55, 60, 65, 70]
        },
        honeydew: {
            category: "Fruits",
            best_time: "Summer (May to July)",
            best_location: "Maharashtra, Karnataka",
            historical_prices: [50, 55, 60, 65, 70, 75, 80]
        },
        pomegranates: {
            category: "Fruits",
            best_time: "Autumn (September to November)",
            best_location: "Rajasthan, Maharashtra, Karnataka",
            historical_prices: [60, 65, 70, 75, 80, 85, 90]
        },
        figs: {
            category: "Fruits",
            best_time: "Summer (May to July)",
            best_location: "Tamil Nadu, Maharashtra",
            historical_prices: [80, 90, 100, 110, 120, 130, 140]
        },
        guavas: {
            category: "Fruits",
            best_time: "Winter (October to January)",
            best_location: "Maharashtra, Uttar Pradesh, Tamil Nadu",
            historical_prices: [30, 35, 40, 45, 50, 55, 60]
        }
    },
    vegetables: {
            spinach: {
                category: "Vegetables",
                best_time: "Winter (October to February)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [20, 25, 30, 35, 40, 45, 50]
            },
            lettuce: {
                category: "Vegetables",
                best_time: "Winter (November to March)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [30, 35, 40, 45, 50, 55, 60]
            },
            kale: {
                category: "Vegetables",
                best_time: "Winter (October to February)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [40, 45, 50, 55, 60, 65, 70]
            },
            swiss_chard: {
                category: "Vegetables",
                best_time: "Winter (November to March)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [50, 55, 60, 65, 70, 75, 80]
            },
            carrots: {
                category: "Vegetables",
                best_time: "Winter (November to February)",
                best_location: "Himachal Pradesh, Punjab, Uttar Pradesh",
                historical_prices: [30, 35, 40, 45, 50, 55, 60]
            },
            potatoes: {
                category: "Vegetables",
                best_time: "Winter (October to February)",
                best_location: "Uttar Pradesh, West Bengal, Madhya Pradesh",
                historical_prices: [25, 30, 35, 40, 45, 50, 55]
            },
            beets: {
                category: "Vegetables",
                best_time: "Winter (November to February)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [20, 25, 30, 35, 40, 45, 50]
            },
            radishes: {
                category: "Vegetables",
                best_time: "Winter (November to March)",
                best_location: "Maharashtra, Uttar Pradesh, Punjab",
                historical_prices: [15, 20, 25, 30, 35, 40, 45]
            },
            turnips: {
                category: "Vegetables",
                best_time: "Winter (November to February)",
                best_location: "Uttar Pradesh, Punjab, Haryana",
                historical_prices: [20, 25, 30, 35, 40, 45, 50]
            },
            broccoli: {
                category: "Vegetables",
                best_time: "Winter (November to February)",
                best_location: "Himachal Pradesh, Punjab, Haryana",
                historical_prices: [40, 45, 50, 55, 60, 65, 70]
            },
            cauliflower: {
                category: "Vegetables",
                best_time: "Winter (November to February)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [35, 40, 45, 50, 55, 60, 65]
            },
            cabbage: {
                category: "Vegetables",
                best_time: "Winter (October to February)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [25, 30, 35, 40, 45, 50, 55]
            },
            brussels_sprouts: {
                category: "Vegetables",
                best_time: "Winter (November to February)",
                best_location: "Punjab, Haryana",
                historical_prices: [60, 65, 70, 75, 80, 85, 90]
            },
            onions: {
                category: "Vegetables",
                best_time: "Winter (November to March)",
                best_location: "Maharashtra, Andhra Pradesh, Karnataka",
                historical_prices: [20, 25, 30, 35, 40, 45, 50]
            },
            garlic: {
                category: "Vegetables",
                best_time: "Winter (November to February)",
                best_location: "Uttar Pradesh, Madhya Pradesh, Gujarat",
                historical_prices: [50, 55, 60, 65, 70, 75, 80]
            },
            shallots: {
                category: "Vegetables",
                best_time: "Winter (November to February)",
                best_location: "Tamil Nadu, Kerala",
                historical_prices: [30, 35, 40, 45, 50, 55, 60]
            },
            leeks: {
                category: "Vegetables",
                best_time: "Winter (November to February)",
                best_location: "Himachal Pradesh, Jammu & Kashmir",
                historical_prices: [40, 45, 50, 55, 60, 65, 70]
            },
            chives: {
                category: "Vegetables",
                best_time: "Spring (March to May)",
                best_location: "Punjab, Haryana",
                historical_prices: [30, 35, 40, 45, 50, 55, 60]
            },
            peas: {
                category: "Vegetables",
                best_time: "Winter (November to March)",
                best_location: "Himachal Pradesh, Jammu & Kashmir",
                historical_prices: [25, 30, 35, 40, 45, 50, 55]
            },
            beans: {
                category: "Vegetables",
                best_time: "Summer (March to May)",
                best_location: "Maharashtra, Punjab, Haryana",
                historical_prices: [50, 55, 60, 65, 70, 75, 80]
            },
            lentils: {
                category: "Vegetables",
                best_time: "Winter (October to December)",
                best_location: "Madhya Pradesh, Rajasthan, Uttar Pradesh",
                historical_prices: [60, 65, 70, 75, 80, 85, 90]
            },
            tomatoes: {
                category: "Vegetables",
                best_time: "Summer (March to June)",
                best_location: "Maharashtra, Andhra Pradesh, Karnataka",
                historical_prices: [30, 35, 40, 45, 50, 55, 60]
            },
            cucumbers: {
                category: "Vegetables",
                best_time: "Summer (April to July)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [20, 25, 30, 35, 40, 45, 50]
            },
            bell_peppers: {
                category: "Vegetables",
                best_time: "Summer (March to June)",
                best_location: "Maharashtra, Karnataka, Himachal Pradesh",
                historical_prices: [60, 65, 70, 75, 80, 85, 90]
            },
            eggplant: {
                category: "Vegetables",
                best_time: "Summer (April to June)",
                best_location: "Maharashtra, Uttar Pradesh, West Bengal",
                historical_prices: [25, 30, 35, 40, 45, 50, 55]
            },
            zucchini: {
                category: "Vegetables",
                best_time: "Summer (March to July)",
                best_location: "Himachal Pradesh, Jammu & Kashmir",
                historical_prices: [40, 45, 50, 55, 60, 65, 70]
            },
            butternut_squash: {
                category: "Vegetables",
                best_time: "Autumn (September to November)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [50, 55, 60, 65, 70, 75, 80]
            },
            acorn_squash: {
                category: "Vegetables",
                best_time: "Autumn (September to November)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [40, 45, 50, 55, 60, 65, 70]
            },
            pumpkin: {
                category: "Vegetables",
                best_time: "Autumn (September to November)",
                best_location: "Punjab, Haryana, Uttar Pradesh",
                historical_prices: [30, 35, 40, 45, 50, 55, 60]
            },
            summer_squash: {
                category: "Vegetables",
                best_time: "Summer (May to July)",
                best_location: "Punjab, Maharashtra, Uttar Pradesh",
                historical_prices: [30, 35, 40, 45, 50, 55, 60]
            },
            mushrooms: {
                category: "Vegetables",
                best_time: "All year round",
                best_location: "Maharashtra, Uttar Pradesh, Karnataka",
                historical_prices: [80, 85, 90, 95, 100, 105, 110]
            },
            sweet_corn: {
                category: "Vegetables",
                best_time: "Summer (May to July)",
                best_location: "Punjab, Uttar Pradesh, Maharashtra",
                historical_prices: [40, 45, 50, 55, 60, 65, 70]
        }    
    }
};

// Function to filter products by category
function filterProductsByCategory(category) {
    const productInput = document.getElementById("productName");
    const suggestionsList = document.getElementById("suggestions");

    if (category && allProductData[category]) {
        // Show product name suggestions based on category and input
        productInput.addEventListener("input", function () {
            const input = productInput.value.toLowerCase();
            const suggestions = getProductSuggestions(category, input);
            displaySuggestions(suggestions);
        });
    }
}

// Function to get product suggestions based on category and input
function getProductSuggestions(category, input) {
    const products = Object.keys(allProductData[category] || {});
    return products.filter(product => product.includes(input));
}

// Function to display product name suggestions
function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = suggestions.map(suggestion => `<li>${suggestion}</li>`).join('');
}

// Function to fetch product data
function getProductData(category, productName) {
    const productData = allProductData[category] && allProductData[category][productName];
    return productData || null;
}

// Function to display product data
function displayProductData(productData) {
    const outputDiv = document.getElementById("output");

    if (productData) {
        const forecastedPrice = forecastPrice(productData.historical_prices);
        outputDiv.innerHTML = `
            <p><strong>Best Time to Sell:</strong> ${productData.best_time}</p>
            <p><strong>Best Location:</strong> ${productData.best_location}</p>
            <p><strong>Forecasted Price:</strong> ₹${forecastedPrice} per kg</p>
        `;
    } else {
        outputDiv.innerHTML = `<p>Sorry, no data available for this product. Please try another product.</p>`;
    }
}

// Function to simulate forecasted price using Exponential Moving Average (EMA)
function forecastPrice(historicalPrices) {
    const smoothingFactor = 0.7;
    let ema = historicalPrices[0]; // Initialize with the first price
    for (let i = 1; i < historicalPrices.length; i++) {
        ema = smoothingFactor * historicalPrices[i] + (1 - smoothingFactor) * ema;
    }
    return ema.toFixed(2);
}
