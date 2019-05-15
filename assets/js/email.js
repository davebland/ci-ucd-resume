function sendEmail(contactForm) {
    emailjs.send("amazon_ses", "resume_site_form", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(function(response) {
        console.log("SUCCESS ", response);
    }, function(err) {
        console.log("Error: ", err);
    });
    return false;  // To block from loading a new page
}