// Firebase Email/Password Sign-Up
function signUp() {
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Sign-up successful!");
            showDevotional();
        })
        .catch(error => alert("Error signing up: " + error.message));
}

// Firebase Email/Password Sign-In
function signIn() {
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Sign-in successful!");
            showDevotional();
        })
        .catch(error => alert("Error signing in: " + error.message));
}

// Firebase Google Sign-In
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            showDevotional();
        })
        .catch(error => alert("Error signing in with Google: " + error.message));
}
// Fetch and display verses based on the chapter
async function fetchBibleVerses(chapter) {
    const verses = [];
    try {
        for (let verseNum = 1; verseNum <= 3; verseNum++) { // Adjust the number of verses as desired
            const response = await fetch(`https://bible-api.com/psalms ${chapter}:${verseNum}`);
            const data = await response.json();
            verses.push(`<p><strong>Psalms ${chapter}:${verseNum}</strong> - "${data.text}"</p>`);
        }
        return verses.join("");
    } catch (error) {
        console.error("Error fetching verses:", error);
        return "<p>Unable to load verses. Please try again later.</p>";
    }
}

async function updateDevotional() {
    const formattedDate = currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    document.getElementById("date").innerText = formattedDate;

    const themes = [
        { name: "Hymns and Songs of Praise", start: new Date("2025-01-01"), end: new Date("2025-03-31") },
        { name: "Imprecatory Psalms", start: new Date("2025-04-01"), end: new Date("2025-06-30") },
        { name: "Royal Psalms", start: new Date("2025-07-01"), end: new Date("2025-10-31") },
        { name: "Thanksgiving Psalms", start: new Date("2025-11-01"), end: new Date("2025-12-31") }
    ];

    const theme = themes.find(t => currentDate >= t.start && currentDate <= t.end).name;
    document.getElementById("theme").innerText = `Theme: ${theme}`;

    const chapter = Math.floor(Math.random() * 150) + 1; // Random chapter for demonstration
    const versesHtml = await fetchBibleVerses(chapter);
    document.getElementById("psalm-verses").innerHTML = versesHtml;
}
const themeChapters = {
    "Hymns and Songs of Praise": [8, 18, 27, 30, 34],
    "Imprecatory Psalms": [35, 52, 55, 59, 69],
    "Royal Psalms": [2, 18, 20, 45, 72],
    "Thanksgiving Psalms": [100, 107, 118, 138, 145]
};

// Function to get the chapter based on theme and day within the theme range
function getChapterForDay(theme, dayInTheme) {
    const chapters = themeChapters[theme];
    return chapters[dayInTheme % chapters.length];
}

async function updateDevotional() {
    const formattedDate = currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    document.getElementById("date").innerText = formattedDate;

    const themes = [
        { name: "Hymns and Songs of Praise", start: new Date("2025-01-01"), end: new Date("2025-03-31") },
        { name: "Imprecatory Psalms", start: new Date("2025-04-01"), end: new Date("2025-06-30") },
        { name: "Royal Psalms", start: new Date("2025-07-01"), end: new Date("2025-10-31") },
        { name: "Thanksgiving Psalms", start: new Date("2025-11-01"), end: new Date("2025-12-31") }
    ];

    // Find the current theme based on the date
    const currentTheme = themes.find(t => currentDate >= t.start && currentDate <= t.end);
    const themeName = currentTheme.name;
    document.getElementById("theme").innerText = `Theme: ${themeName}`;

    // Calculate day within the theme range
    const dayInTheme = Math.floor((currentDate - currentTheme.start) / (1000 * 60 * 60 * 24));
    const chapter = getChapterForDay(themeName, dayInTheme);

    // Fetch and display the verses for the selected chapter
    const versesHtml = await fetchBibleVerses(chapter);
    document.getElementById("psalm-verses").innerHTML = versesHtml;
}

async function fetchBibleVerses(chapter) {
    const verses = [];
    try {
        for (let verseNum = 1; verseNum <= 3; verseNum++) {
            const response = await fetch(`https://bible-api.com/psalms ${chapter}:${verseNum}`);
            const data = await response.json();
            verses.push(`<p><strong>Psalms ${chapter}:${verseNum}</strong> - "${data.text}"</p>`);
        }
        return verses.join("");
    } catch (error) {
        console.error("Error fetching verses:", error);
        return "<p>Unable to load verses. Please try again later.</p>";
    }
}