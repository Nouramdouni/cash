function initializeCardFormValidation() {
        const cardInput = document.getElementById('cardInput');
        const cardImage = document.getElementById('cardImage');
        const expiryInput = document.querySelector('input[name="expiry_date"]');
        const expiryError = document.getElementById('expiryError');
        const cvvInput = document.querySelector('input[name="cvv"]');

        // 💳 Carte : détection du type
        cardInput.addEventListener('input', () => {
            const value = cardInput.value.replace(/\D/g, '');
            let cardType = null;
            cardImage.style.display = 'none';

            if (value.startsWith('4') && value.length === 16) {
                cardType = 'Visa';
                cardImage.src = 'visaa.png';
            } else if ((value.startsWith('34') || value.startsWith('37')) && value.length === 15) {
                cardType = 'Amex';
                cardImage.src = 'amexx.png';
            } else if (
                (value.startsWith('5') && ['1', '2', '3', '4', '5'].includes(value.charAt(1))) ||
                (parseInt(value.substring(0, 4)) >= 2221 && parseInt(value.substring(0, 4)) <= 2720)
            ) {
                if (value.length >= 16 && value.length <= 19) {
                    cardType = 'Mastercard';
                    cardImage.src = 'mastercard.jpg';
                }
            }

            if (cardType) {
                cardImage.style.display = 'inline';
            }
        });

        // 📅 Expiration : format et validité
        expiryInput.addEventListener('input', () => {
            let value = expiryInput.value.replace(/\D/g, '');
            if (value.length >= 3) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            expiryInput.value = value;

            const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!regex.test(value)) {
                expiryError.textContent = "Format invalide. Utilisez MM/YY.";
                return;
            }

            const currentDate = new Date();
            const inputMonth = parseInt(value.slice(0, 2));
            const inputYear = parseInt("20" + value.slice(3, 5));
            const expiryDate = new Date(inputYear, inputMonth);

            if (expiryDate <= currentDate) {
                expiryError.textContent = "Carte expirée.";
            } else {
                expiryError.textContent = "";
            }
        });

        // 🔐 CVV : vérification
        cvvInput.addEventListener('input', function (e) {
            const cvv = e.target.value;
            const isValid = /^\d{3,4}$/.test(cvv);
            e.target.style.borderColor = isValid ? 'green' : 'red';
        });
    }
        const nameInput = document.querySelector('input[name="cardholder"]');
        const addressInput = document.querySelector('input[name="billing_address"]');

        // Nom sur la carte : lettres uniquement
        nameInput.addEventListener('input', () => {
            const regex = /^[a-zA-Z\s]*$/;
            if (!regex.test(nameInput.value)) {
                nameInput.style.borderColor = 'red';
            } else {
                nameInput.style.borderColor = 'green';
            }
        });

        // Adresse de facturation : minimum 5 caractères
        addressInput.addEventListener('input', () => {
            if (addressInput.value.trim().length < 5) {
                addressInput.style.borderColor = 'red';
            } else {
                addressInput.style.borderColor = 'green';
            }
        });

    // Exécuter la fonction une fois le DOM chargé
    document.addEventListener('DOMContentLoaded', initializeCardFormValidation);
