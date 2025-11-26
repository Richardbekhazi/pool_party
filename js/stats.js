/**
 * Monitors the contacts table and updates the Dashboard Stats (Total Pool & Count)
 * Auto-calculates based on the visible rows in the table.
 */
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#contacts-table tbody');
    const statTotal = document.getElementById('statTotal');
    const statCount = document.getElementById('statCount');

    if (!tableBody || !statTotal || !statCount) return;

    // Function to calculate totals from DOM
    const updateStats = () => {
        const rows = Array.from(tableBody.querySelectorAll('tr:not(.skeleton-row)'));
        
        // 1. Count Guests
        const count = rows.length;
        
        // 2. Sum Fees (Assuming 3rd column index 2 is "Fee" e.g., "$45.00")
        let total = 0;
        rows.forEach(row => {
            const feeCell = row.cells[2]; 
            if (feeCell) {
                // Remove '$' and ',' then parse
                const raw = feeCell.innerText.replace(/[^0-9.-]+/g,"");
                const val = parseFloat(raw);
                if (!isNaN(val)) total += val;
            }
        });

        // Update UI
        statCount.innerText = count;
        statTotal.innerText = '$' + total.toLocaleString(); // Adds commas
    };

    // Use MutationObserver to watch for when render_attendees.js populates the table
    const observer = new MutationObserver((mutations) => {
        // If we see valid rows (not skeleton), update stats
        const hasData = tableBody.querySelector('tr:not(.skeleton-row)');
        if (hasData) {
            updateStats();
        }
    });

    observer.observe(tableBody, { childList: true, subtree: true });
});