const days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];


module.exports = function(date) {
    const d = `${date.getUTCDate()}`;
    return `${days[date.getUTCDay()]}, ${d}${d.endsWith('1') ? 'st' : (d.endsWith('2') ? 'nd' : (d.endsWith('3') ? 'rd' : 'th'))} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}, ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')} UTC`;
};
