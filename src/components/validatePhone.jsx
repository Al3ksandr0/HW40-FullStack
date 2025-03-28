export default function validatePhone(phone) {
    // - пробелы скобки дефисы
    const clean = phone.replace(/[()\s-]/g, "");
    return /^\d{10,15}$/.test(clean);
}
