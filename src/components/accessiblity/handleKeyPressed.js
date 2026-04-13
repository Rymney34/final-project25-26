//accessiblity function to click with enter on the anything
export const handleKeyPress = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
    }
};