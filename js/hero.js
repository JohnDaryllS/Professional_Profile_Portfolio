// Name wave animation
document.addEventListener('DOMContentLoaded', function() {
    const name = document.querySelector('.name-wave');
    
    // Split name into letters
    if (name) {
        name.innerHTML = name.textContent.split('').map((letter, i) => 
            `<span style="--i: ${i}">${letter}</span>`
        ).join('');
        
        // Add hover effect
        name.addEventListener('mouseenter', () => {
            name.classList.add('waving');
        });
        
        name.addEventListener('animationend', () => {
            name.classList.remove('waving');
        });
    }
});