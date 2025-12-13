const wishInput2 = document.getElementById('wish-input');
// const tourForm = document.getElementById('tour-form');
const contactForm2 = document.getElementById('contact-form');
const wishBtn = document.getElementById('wishBtn');
const wishContainer2 = document.getElementById('wish-wall-container');


console.log("gasoijdasooidasoidsajoi")



async function sendTourRegister() {

    if (tourFormSend) {
        tourFormSend.addEventListener('submit', async(e) => {
            e.preventDefault();

            const tourRegisterData = {
                name: document.getElementById('tourName').value,
                phone: document.getElementById('tourPhoneNumber').value,
                people: document.getElementById('numberOfPeople').value,
            }

            console.log(tourRegisterData);
            const res = await fetch("http://127.0.0.1:5000/api/book_tour", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tourRegisterData)
            });

        })
    }

}


async function sendContact() {

    if (contactForm2) {

        contactForm2.addEventListener('submit', (e) => {
            e.preventDefault();

            const payload = {
                name: contactForm2.name.value,
                email: contactForm2.email.value,
                message: document.getElementById("message").value
            };

            console.log(payload)

            const res = fetch("http://127.0.0.1:5000/api/save_contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            // contactForm2.name.value = '';
            // contactForm2.email.value = '';
            // document.getElementById("message").value = '';

        })
    }

}

sendContact();
sendTourRegister();