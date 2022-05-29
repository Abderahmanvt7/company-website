// Select landing page 
let landingPage = document.querySelector(".landing-page");
// get array of images 
let imgArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];
// functiont to randomise images
let backgroundOptions = true; // variable contain the background state 
let backgroundInterval;    // variable contain the interval randomize images
if( backgroundOptions === true){
    function randomImages(){
        backgroundInterval = setInterval( () => {
            // Get random number 
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            // Change the background images 
            landingPage.style.backgroundImage = "url(\"images/"+imgArray[randomNumber]+"\")";
        }, 10000);
    };
};
randomImages();

// Add class open to the box settings
let boxSettings = document.querySelector(".setting-box");
document.querySelector(".setting-icon").onclick = function(){
    boxSettings.classList.toggle("open");
};

// switch colors
const colorsList = document.querySelectorAll(".colors-liste li");
colorsList.forEach(li => {
    li.addEventListener("click", (e) => {
        //Set color in root
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        // Set color in local storage
        localStorage.setItem("color-option",e.target.dataset.color);
        handleState(e); // call function handllState to handl the class active
    }); 
});
// Save the main color in the local stoarge 
let colorStorage = localStorage.getItem("color-option");
if( colorStorage !== null){
    document.documentElement.style.setProperty("--main-color", colorStorage);
    colorsList.forEach(li => {
        li.classList.remove("active");
        if(li.dataset.color == colorStorage){
            li.classList.add("active");
        }
    });

};

// switch random background options
let optionBackEl = document.querySelectorAll(".random-background span");
optionBackEl.forEach(span => {
    span.addEventListener("click", (e) => {
        handleState(e);// call function handllState to handl the class active
        if(e.target.dataset.background === "yes"){
            backgroundOptions = true;
            localStorage.setItem("background-option","true");
            randomImages();
        } else {
            backgroundOptions = false;
            localStorage.setItem("background-option","false");
            clearInterval(backgroundInterval);
        }
    })
});

// Save the bacgorund option in the local storage
let backOptionStorage = localStorage.getItem("background-option");
if(backOptionStorage !== null){
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");
    });
    if(backOptionStorage === "true"){
        backgroundOptions = true;
        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        backgroundOptions = false;
        document.querySelector(".random-background .no").classList.add("active");
    }
};

// switch bullets options (show or hid)
let bullestSpans = document.querySelectorAll(".bullets-options span");
bullestSpans.forEach(span => {
    span.addEventListener("click", (e) => {
        handleState(e);// call function handllState to handl the class active
        if(e.target.dataset.display === "show"){
            document.querySelector(".nav-bullets").style.display = "block";
            // Set the bullets option in the local storage
            localStorage.setItem("bullets-option", "block");
        } else {
            document.querySelector(".nav-bullets").style.display = "none";
            // Set the bullets option in the local storage
            localStorage.setItem("bullets-option", "none");
        }
    });
});
// Save the bullets options in the locl storage
let bulletsOptionStorage = localStorage.getItem("bullets-option");
if(bulletsOptionStorage !== null){
    bullestSpans.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletsOptionStorage === "block"){
        document.querySelector(".nav-bullets").style.display = "block";
        document.querySelector(".bullets-options .yes").classList.add("active");
    } else {
        document.querySelector(".nav-bullets").style.display = "none";
        document.querySelector(".bullets-options .no").classList.add("active");;
    } 
};

// Reset all options
document.querySelector(".reset-options").onclick = function (){
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullets-option");
    window.location.reload();
};



// Skill section 
let ourSkills = document.querySelector(".skills");
window.onscroll = function (){
    let skillOffsetTop = ourSkills.offsetTop,
        skillOuterHight = ourSkills.offsetHeight,
        windowHeight = this.innerHeight,
        windowScrollTop = this.pageYOffset;

    if( windowScrollTop > ( skillOffsetTop + skillOuterHight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach( skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

// Creat popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {

        // creat the overlay
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // creat the popup box 
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        // Add the alt content as aheading with the image
        if( img.alt !== null){
            imgHeading = document.createElement("h3");
            imgAltText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgAltText);
            popupBox.appendChild(imgHeading);
        }
        // creat a new image that will change here source  with the source of image clicked
        let popupImage = document.createElement("img");

        // set the source of the img clicked to the boxImage
        popupImage.src = img.src;

        // Add the img in the popup and add it in the body
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        // creat the close button
        let closeButton = document.createElement("span");
        closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);
    })
});

// Close popup
document.addEventListener("click", function(e){
    // search for element that have class close-button ,that mean that is the close button
    if(e.target.className === "close-button"){   
        //remove the parent of the button == that mean remove the popup box
        e.target.parentNode.remove();
        // search for the overlay and remove it
        document.querySelector(".popup-overlay").remove();
    }
})

// Function to scroll to page sections
function scrollToSomeWhere(element){
    const allElements = document.querySelectorAll(element);
    allElements.forEach(ele => {
        ele.addEventListener("click", function(e){
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:"smooth",
                
            });
        });
    });
};
// Call precedent function
scrollToSomeWhere(".nav-bullets .bullets"); // scroll with bullets
scrollToSomeWhere(".links a"); // scroll with links


// Handle state 
function handleState(e){
        // Add class active on the element choised and remove it in the others
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
};

// Toggle menu
let toggleButton = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");
toggleButton.onclick = function(e){
    e.stopPropagation();
    // toggle class meuu-active on the toggle-menu to show the flech 
    toggleButton.classList.toggle("menu-active");
    // toggle class open on the links 
    theLinks.classList.toggle("open");
};
// Stop propagation on the links menu
theLinks.onclick = function (e){
    e.stopPropagation();
};
// Close the links menu whene user click on anywhere without itself or the button
document.addEventListener("click", (e) => {
    if(e.target !== toggleButton && e.target !== theLinks){
        if(theLinks.classList.contains("open")){
            toggleButton.classList.toggle("menu-active");
            theLinks.classList.toggle("open");
        }
    }
});