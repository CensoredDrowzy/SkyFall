import { sellhubApiKey } from './config.js';
<script type="module" src="https://public.sellhub.cx/embeds.js"></script>
// Product data for each game category
const products = {
    fortnite: [
        {
            id: 'fn-internal',
            name: 'Fortnite Internal',
            description: 'Advanced internal cheat with customizable features',
            price: 39.99,
            image: 'https://via.placeholder.com/300x150/00c8ff/001a33?text=Fortnite+Internal',
            sellhubId: 'YOUR_FORTNITE_INTERNAL_ID', // Replace with actual SellHub product ID
            variantId: '48466442-4ef3-4d15-b263-5a96bd5ed0d8'
        },
        {
            id: 'fn-esp',
            name: 'Fortnite ESP',
            description: 'Player/item visibility through walls and terrain',
            price: 24.99,
            image: 'https://via.placeholder.com/300x150/6b21a8/ffffff?text=Fortnite+ESP',
            sellhubId: 'YOUR_FORTNITE_ESP_ID'
        }
    ],
    blackops6: [
        {
            id: 'bo6-wallhack',
            name: 'Black Ops 6 Wallhack',
            description: 'See enemies through walls with customizable ESP',
            price: 34.99,
            image: 'https://via.placeholder.com/300x150/1e40af/ffffff?text=BO6+Wallhack',
            sellhubId: 'YOUR_BO6_WALLHACK_ID'
        },
        {
            id: 'bo6-aimbot',
            name: 'Black Ops 6 Aimbot',
            description: 'Precision aiming assistance with multiple modes',
            price: 39.99,
            image: 'https://via.placeholder.com/300x150/1e40af/ffffff?text=BO6+Aimbot',
            sellhubId: 'YOUR_BO6_AIMBOT_ID'
        }
    ],
    rainbow6: [
        {
            id: 'r6-recoil',
            name: 'Rainbow 6 Recoil Control',
            description: 'Perfect recoil compensation for all weapons',
            price: 27.99,
            image: 'https://via.placeholder.com/300x150/701a75/ffffff?text=R6+Recoil',
            sellhubId: 'YOUR_R6_RECOIL_ID'
        },
        {
            id: 'r6-esp',
            name: 'Rainbow 6 ESP',
            description: 'Advanced enemy and item detection system',
            price: 31.99,
            image: 'https://via.placeholder.com/300x150/701a75/ffffff?text=R6+ESP',
            sellhubId: 'YOUR_R6_ESP_ID'
        }
    ]
};

// Initialize product sliders
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('products-container');
    
    // Create sliders for each game category
    for (const [game, items] of Object.entries(products)) {
        const section = document.createElement('section');
        section.className = 'game-section';
        
        // Section header
        const header = document.createElement('h2');
        header.className = 'text-2xl md:text-3xl font-bold text-white title-font mb-6 capitalize';
        header.textContent = game.replace('blackops6', 'Black Ops 6').replace('fortnite', 'Fortnite').replace('rainbow6', 'Rainbow 6');
        section.appendChild(header);
        
        // Slider container
        const sliderContainer = document.createElement('div');
        sliderContainer.className = `swiper swiper-${game} relative`;
        sliderContainer.innerHTML = `
            <div class="swiper-wrapper"></div>
            <div class="swiper-button-next text-purple-400"></div>
            <div class="swiper-button-prev text-purple-400"></div>
        `;
        
        // Add product cards to slider
        const wrapper = sliderContainer.querySelector('.swiper-wrapper');
        items.forEach(product => {
            const card = document.createElement('div');
            card.className = 'swiper-slide glass-card overflow-hidden';
            card.innerHTML = `
                <div class="h-full flex flex-col">
                    <div class="relative overflow-hidden h-48">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                    </div>
                    <div class="p-5 flex-grow">
                        <div class="flex justify-between items-start mb-3">
                            <h3 class="text-xl font-bold text-white">${product.name}</h3>
                            <span class="text-xs font-semibold bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full">NEW</span>
                        </div>
                        <p class="text-gray-300 text-sm mb-5">${product.description}</p>
                        <div class="mt-auto">
                            <div class="flex justify-between items-center mb-4">
                                <span class="text-2xl font-bold text-cyan-400">$${product.price.toFixed(2)}</span>
                                <span class="text-xs text-gray-400">Lifetime Updates</span>
                            </div>
                            <div class="flex flex-col space-y-2">
                                <div class="flex space-x-2">
                                    <button
                                        data-sellhub-product="3e77f619-d7e3-4e1a-9954-6fe5e688660a"
                                        class="sellhub-btn"
                                    >
                                        Buy Variant
                                    </button>
                                    <button
                                        data-sellhub-cart-product="3e77f619-d7e3-4e1a-9954-6fe5e688660a"
                                        class="sellhub-btn"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        data-sellhub-open-cart-store-url="https://skyfall.sellhub.cx"
                                        style="
                                            border-radius: 10px;
                                            background-color: #ffffff;
                                            color: #000000;
                                            padding: 5px 31px;
                                        "
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top:4px;margin-bottom:4px;">
                                            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            wrapper.appendChild(card);
        });
        
        section.appendChild(sliderContainer);
        container.appendChild(section);
    }
    
    // Initialize all sliders
    for (const game of Object.keys(products)) {
        new Swiper(`.swiper-${game}`, {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: `.swiper-${game} .swiper-button-next`,
                prevEl: `.swiper-${game} .swiper-button-prev`,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }
    
    // Initialize SellHub with error handling
    function initializeSellHub() {
        if (typeof SellHub !== 'undefined') {
            SellHub.init({
                apiKey: 'cec68c8f-c259-4b62-a7ef-7cdd81a03d9d_oi7vv55dn58wwom9fbmbl4xg99ixfdo2ni3zqo7ewd904dmvt8f0tbq8cvpqmzzv'
            }).then(() => {
                console.log('SellHub initialized successfully');
            }).catch(err => {
                console.error('SellHub initialization failed:', err);
            });
        } else {
            console.error('SellHub is not defined');
        }
    }

    // Wait for DOM and SellHub to load
    if (document.readyState === 'complete') {
        initializeSellHub();
    } else {
        window.addEventListener('DOMContentLoaded', initializeSellHub);
        window.addEventListener('sellhub:ready', initializeSellHub);
    }
});