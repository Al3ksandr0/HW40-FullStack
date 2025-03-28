const namePattern = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'-]+$/;
export default function validateName(name) {
    return namePattern.test(name.trim());
}
