// Certificate Modal Functionality
const certificateData = {
    'cert1': {
        title: 'Full Stack Web Development',
        issuer: 'Coding Academy',
        issued: 'January 2023',
        valid: 'January 2026',
        id: 'CA-78945612',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        verifyUrl: '#'
    },
    'cert2': {
        title: 'JavaScript Algorithms',
        issuer: 'FreeCodeCamp',
        issued: 'June 2022',
        valid: 'Lifetime',
        id: 'FCC-12345678',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        verifyUrl: '#'
    }
    // Add more certificates as needed
};

function openCertificateModal(certId) {
    const cert = certificateData[certId];
    const modal = document.getElementById('certificateModal');
    
    // Set modal content
    document.getElementById('modalTitle').textContent = cert.title;
    document.getElementById('modalIssuer').textContent = `Issued by: ${cert.issuer}`;
    document.getElementById('modalDates').textContent = `Valid until: ${cert.valid}`;
    document.getElementById('modalId').textContent = `ID: ${cert.id}`;
    document.getElementById('modalImage').src = cert.imageUrl;
    document.getElementById('modalImage').alt = cert.title;
    
    // Set download button
    const downloadBtn = document.querySelector('.btn-download');
    downloadBtn.onclick = function() {
        window.open(cert.imageUrl, '_blank');
    };
    
    // Display modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function verifyCertificate() {
    const certId = document.getElementById('modalId').textContent.replace('ID: ', '');
    // This would normally open the verification URL
    alert(`Verification would check certificate ID: ${certId}`);
    // window.open(certificateData[certId].verifyUrl, '_blank');
}

// Close modal when clicking outside content
window.onclick = function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target == modal) {
        closeCertificateModal();
    }
}

// Close with ESC key
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeCertificateModal();
    }
});