import { sellhubApiKey } from './config.js';

// Simple product display with exact button code
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('products-container');
    
    container.innerHTML = `
        <div class="max-w-md mx-auto p-4">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-white mb-4">Fortnite Internal</h2>
                <div class="flex justify-center space-x-2">
                    <button
                        data-sellhub-product="3e77f619-d7e3-4e1a-9954-6fe5e688660a"
                        style="
                            border-radius: 10px;
                            background-color: #ffffff;
                            color: #000000;
                            padding: 5px 25px;
                        "
                    >
                        Buy Variant
                    </button>
                    <button
                        data-sellhub-cart-product="3e77f619-d7e3-4e1a-9954-6fe5e688660a"
                        style="
                            border-radius: 10px;
                            background-color: #ffffff;
                            color: #000000;
                            padding: 5px 25px;
                        "
                    >
                        Add to Cart
                    </button>
                    <button
                        data-sellhub-open-cart-store-url="https://skyfall.sellhub.cx"
                        style="
                            border-radius: 10px;
                            background-color: #ffffff;
                            color: #000000;
                            padding: 5px 25px;
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
    `;

    // Initialize SellHub
    if (window.SellHub) {
        SellHub.init({ apiKey: sellhubApiKey })
            .then(() => console.log('SellHub ready'))
            .catch(err => console.error('SellHub error:', err));
    } else {
        window.addEventListener('sellhub:ready', () => {
            SellHub.init({ apiKey: sellhubApiKey })
                .then(() => console.log('SellHub ready'))
                .catch(err => console.error('SellHub error:', err));
        });
    }
});
