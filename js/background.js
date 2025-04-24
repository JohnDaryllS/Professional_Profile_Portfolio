document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('circuit');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Circuit settings
    const gridSize = 40;
    const cols = Math.ceil(canvas.width / gridSize);
    const rows = Math.ceil(canvas.height / gridSize);
    const nodes = [];
    const connections = [];
    
    // Create nodes
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (Math.random() > 0.7) { // 70% chance to create a node
          nodes.push({
            x: x * gridSize,
            y: y * gridSize,
            active: false
          });
        }
      }
    }
    
    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      // Find closest nodes
      const closest = nodes
        .map((other, j) => ({ index: j, distance: Math.hypot(node.x - other.x, node.y - other.y) }))
        .filter(item => item.distance > 0 && item.distance < gridSize * 2)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3); // Connect to max 3 nearest nodes
      
      closest.forEach(item => {
        if (!connections.some(conn => 
          (conn.from === i && conn.to === item.index) || 
          (conn.from === item.index && conn.to === i))) {
          connections.push({
            from: i,
            to: item.index,
            progress: 0,
            speed: 0.002 + Math.random() * 0.003
          });
        }
      });
    });
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = '#0f0';
      ctx.lineWidth = 1;
      
      connections.forEach(conn => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        
        // Animate the connection
        conn.progress += conn.speed;
        if (conn.progress > 1) conn.progress = 0;
        
        const activePoint = {
          x: from.x + (to.x - from.x) * conn.progress,
          y: from.y + (to.y - from.y) * conn.progress
        };
        
        // Draw the full connection (dim)
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
        ctx.stroke();
        
        // Draw the active part
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(activePoint.x, activePoint.y);
        ctx.strokeStyle = '#0f0';
        ctx.stroke();
        
        // Draw a glowing dot at the active point
        ctx.beginPath();
        ctx.arc(activePoint.x, activePoint.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#0f0';
        ctx.fill();
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = node.active ? '#0f0' : 'rgba(0, 255, 0, 0.5)';
        ctx.fill();
        
        // Randomly activate nodes
        if (Math.random() > 0.99) node.active = !node.active;
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  });