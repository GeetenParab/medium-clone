function formatDate(dateString:string) {
    const date = new Date(dateString);

    // Define arrays for month names and suffixes
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const suffixes = ["th", "st", "nd", "rd"];

    // Extract date parts
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Determine suffix for the day
    const suffix =
        (day % 10 === 1 && day !== 11) ? suffixes[1] :
        (day % 10 === 2 && day !== 12) ? suffixes[2] :
        (day % 10 === 3 && day !== 13) ? suffixes[3] :
        suffixes[0];

    return `${day}${suffix} ${month} ${year}`;
}

export default formatDate;