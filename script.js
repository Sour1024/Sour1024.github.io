// Mentor data
const mentors = [
    {
        id: 1,
        name: "Dr. Sharma",
        expertise: "Artificial Intelligence",
        availableSlots: ["Monday 2-3 PM", "Wednesday 4-5 PM"],
        rating: 4.9,
        experience: "15+ years",
        image: "/api/placeholder/100/100"
    },
    {
        id: 2,
        name: "Prof. Gupta",
        expertise: "Web Development",
        availableSlots: ["Tuesday 1-2 PM", "Thursday 3-4 PM"],
        rating: 4.8,
        experience: "12+ years",
        image: "/api/placeholder/100/100"
    },
    {
        id: 3,
        name: "Dr. Patel",
        expertise: "Data Science",
        availableSlots: ["Monday 3-4 PM", "Friday 2-3 PM"],
        rating: 4.7,
        experience: "10+ years",
        image: "/api/placeholder/100/100"
    },
    {
        id: 4,
        name: "Prof. Singh",
        expertise: "Cybersecurity",
        availableSlots: ["Wednesday 1-2 PM", "Thursday 4-5 PM"],
        rating: 4.9,
        experience: "18+ years",
        image: "/api/placeholder/100/100"
    }
];

// DOM Elements
const mentorList = document.getElementById('mentor-list');
const bookingForm = document.getElementById('booking-form');
const mentorSearch = document.getElementById('mentor-search');
const notification = document.getElementById('notification');

// Display Mentors
function displayMentors(filteredMentors = mentors) {
    mentorList.innerHTML = '';
    
    filteredMentors.forEach((mentor, index) => {
        const mentorCard = document.createElement('div');
        mentorCard.className = 'mentor-card animate__animated animate__fadeIn';
        mentorCard.style.animationDelay = `${index * 0.1}s`;
        
        mentorCard.innerHTML = `
            <img src="pixe.jpeg" width = "300" height="200" alt="${mentor.name}" class="mentor-image">
            <h3>${mentor.name}</h3>
            <p class="expertise"><strong>Expertise:</strong> ${mentor.expertise}</p>
            <p class="experience"><strong>Experience:</strong> ${mentor.experience}</p>
            <div class="rating">
                <span>★</span> ${mentor.rating}
            </div>
            <div class="available-slots">
                <h4>Available Slots:</h4>
                <ul>
                    ${mentor.availableSlots.map(slot => `<li>${slot}</li>`).join('')}
                </ul>
            </div>
            <button onclick="bookMentor(${mentor.id})" class="book-button">Book Session</button>
        `;
        
        mentorList.appendChild(mentorCard);
    });
}

// Setup Booking Form
function setupBookingForm() {
    bookingForm.innerHTML = `
        <div class="form-group">
            <select id="mentor-select" class="form-select" required>
                <option value="">Select a Mentor</option>
                ${mentors.map(mentor => `
                    <option value="${mentor.id}">${mentor.name} - ${mentor.expertise}</option>
                `).join('')}
            </select>
        </div>
        <div class="form-group">
            <select id="slot-select" class="form-select" required>
                <option value="">Select a Time Slot</option>
            </select>
        </div>
        <button type="submit" class="submit-button">Book Session</button>
    `;

    const mentorSelect = document.getElementById('mentor-select');
    const slotSelect = document.getElementById('slot-select');

    // Update available slots when mentor is selected
    mentorSelect.addEventListener('change', () => {
        const selectedMentor = mentors.find(m => m.id === parseInt(mentorSelect.value));
        slotSelect.innerHTML = '<option value="">Select a Time Slot</option>';
        
        if (selectedMentor) {
            selectedMentor.availableSlots.forEach(slot => {
                slotSelect.innerHTML += `<option value="${slot}">${slot}</option>`;
            });
        }
    });

    // Handle form submission
    bookingForm.addEventListener('submit', handleBookingSubmission);
}

// Handle Booking Submission
function handleBookingSubmission(e) {
    e.preventDefault();
    
    const mentorSelect = document.getElementById('mentor-select');
    const slotSelect = document.getElementById('slot-select');
    
    if (mentorSelect.value && slotSelect.value) {
        const selectedMentor = mentors.find(m => m.id === parseInt(mentorSelect.value));
        const selectedSlot = slotSelect.value;
        
        // Remove booked slot
        removeBookedSlot(selectedMentor.id, selectedSlot);
        
        // Show success notification
        showNotification('Booking successful! You will receive a confirmation email shortly.', 'success');
        
        // Reset form
        bookingForm.reset();
        slotSelect.innerHTML = '<option value="">Select a Time Slot</option>';
    } else {
        showNotification('Please select both a mentor and a time slot.', 'error');
    }
}

// Remove Booked Slot
function removeBookedSlot(mentorId, bookedSlot) {
    const mentor = mentors.find(m => m.id === mentorId);
    if (mentor) {
        mentor.availableSlots = mentor.availableSlots.filter(slot => slot !== bookedSlot);
        displayMentors();
        setupBookingForm();
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.className = 'notification hidden';
    }, 3000);
}

// Search Functionality
function setupSearch() {
    mentorSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMentors = mentors.filter(mentor => 
            mentor.name.toLowerCase().includes(searchTerm) ||
            mentor.expertise.toLowerCase().includes(searchTerm)
        );
        displayMentors(filteredMentors);
    });
}

// Smooth Scroll Navigation
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Book Mentor Button Click Handler
function bookMentor(mentorId) {
    const mentorSelect = document.getElementById('mentor-select');
    if (mentorSelect) {
        mentorSelect.value = mentorId;
        mentorSelect.dispatchEvent(new Event('change'));
        
        document.querySelector('#booking').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayMentors();
    setupBookingForm();
    setupSearch();
    setupSmoothScroll();
    
    // Add scroll animation for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});