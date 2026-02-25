//START UNIVERSAL VARIABLES STATING
let selectedDayCell = null;
let connectSetupComplete = false;
let selectedDate = new Date();
let selectedTime = '';
let selectedTags = [];
let activeEventPill = null;

const homeli = document.querySelector('.homeli');
const calendarli = document.querySelector('.calendarli');
const connectlione = document.querySelector('.connectlione');
const connectlitwo = document.querySelector('.connectlitwo')
const journeyli = document.querySelector('.journeyli');

const homepage = document.querySelector('.homepage');
const calendarpage = document.querySelector('.calendarpage');
const connectpage = document.querySelector('.connectpage');
const connectafter = document.querySelector('.connectafterset');
const journeypage = document.querySelector('.journeypage');
const getstartedpage = document.querySelector('.getstartedpage');
const tasklistbox = document.querySelector('.tasklistbox');
const nottask = document.querySelector('.not-task')

const navbarbuttons = document.querySelectorAll('.navbarButtons');
const header = document.querySelector('.header');
const newlogo = document.querySelector('.newlogo');
const normallogo = document.querySelector('.normal');
//END UNIVERSAL VARIABLES STATING

function hideNavbarButtons() {
    navbarbuttons.forEach(btn => btn.style.display = 'none');
}

function showNavbarButtons() {
    navbarbuttons.forEach(btn => {
        btn.style.display = 'inline-block';
        btn.style.width = 'auto';
        btn.style.maxWidth = 'none';
        btn.classList.add('show');
    });
}

function clear() {
    const pages = [
        homepage, calendarpage, nottask, connectpage, 
        connectafter, journeypage, getstartedpage, tasklistbox
    ];
    
    const navItems = [homeli, calendarli, connectlione, connectlitwo, journeyli];

    pages.forEach(pg => { if (pg) pg.style.display = 'none'; });

    navItems.forEach(li => {
        if (li) {
            li.style.textDecoration = 'none';
            li.style.display = 'list-item'; 
        }
    });

    if (connectSetupComplete) {
        if (connectlione) connectlione.style.display = 'none';
        if (connectlitwo) connectlitwo.style.display = 'list-item';
    } else {
        if (connectlione) connectlione.style.display = 'list-item';
        if (connectlitwo) connectlitwo.style.display = 'none';
        if (connectpage) connectpage.classList.remove('connectafterset');
    }

    document.body.style.background = '';
    document.body.style.backgroundColor = '';
    document.body.style.animation = '';
    header.style.backgroundColor = '';
    header.style.color = '';

    hideNavbarButtons();
    if (newlogo) newlogo.style.display = 'none';
}

function home() {
    clear(); 
    if (homeli) homeli.style.textDecoration = 'underline'; 
    if (homepage) homepage.style.display = 'flex'; 
}

// Fixed to only handle Monthly logic
function calendar() {
    clear();
    calendarli.style.textDecoration = 'underline';
    calendarpage.style.display = 'block';
    nottask.style.display = 'block';
   
    tasklistbox.style.display = 'none';
    generateCalendar();
    updateCalendarHeader();
    randomGradientFromList();
}

function connect() {
    clear(); 
    if (connectSetupComplete) {
        if (connectlitwo) connectlitwo.style.textDecoration = 'underline';
        if (connectafter) connectafter.style.display = 'flex'; 
    } else {
        if (connectlione) connectlione.style.textDecoration = 'underline';
        if (connectpage) connectpage.style.display = 'flex';
    }
}

function finalizeConnect() {
    const selectedCount = document.querySelectorAll('.school.selected').length;
    if (selectedCount > 0) {
        connectSetupComplete = true;
        connect(); 
    } else {
        alert("Please select at least one school!");
    }
}

function journey() {
    clear();
    journeyli.style.textDecoration = 'underline';
    journeypage.style.display = 'block';
}

function taskListPage() {
    tasklistbox.style.display = 'block'; 
    nottask.style.display = 'none'
}

function getStarted() {
    setTimeout(() => {
        clear();
        getstartedpage.style.display = 'block';
        document.body.style.background = 'linear-gradient(270deg, #aae781, #3aa3c7, purple, black)';
        document.body.style.backgroundSize = '800% 800%';
        document.body.style.animation = 'gradientAnimation 15s ease infinite';

        document.querySelectorAll('.signupButtons').forEach(btn => {
            btn.style.background = 'linear-gradient(270deg, #ff7f50, #ff1493, #1e90ff, #32cd32)';
            btn.style.backgroundSize = '400% 400%';
            btn.style.animation = 'buttonGradientAnimation 8s ease infinite';
        });

        header.style.backgroundColor = '#81aae7';
        header.style.color = 'white';
        normallogo.style.display = 'none';
        newlogo.style.display = 'block';
        showNavbarButtons();
    }, 500);
}

function logIn() {
    clear();
    home();
}

document.addEventListener('DOMContentLoaded', home);

function generateCalendar() {
    const grid = document.getElementById('calendar-grid');
    grid.style.gridTemplateColumns = 'repeat(7, 1fr)'; // Always 7 columns
    grid.innerHTML = '';

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const today = new Date();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'empty';
        grid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'day';
        cell.textContent = day;

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            cell.classList.add('today');
        }

        cell.addEventListener('click', () => {
            document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
            cell.classList.add('selected');
            selectedDayCell = cell;
            openAddEventModal();
        });

        grid.appendChild(cell);
    }
}

function updateCalendarHeader() {
    const monthName = selectedDate.toLocaleString('default', { month: 'long' });
    document.getElementById('month-display').textContent = `${monthName} ${selectedDate.getFullYear()}`;
}

function openAddEventModal() {
    selectedTags = [];
    selectedTime = '';
    document.getElementById('task-date').textContent = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('task-tags').innerHTML = `<span class="tag-placeholder">None</span>`;
    document.getElementById('tag-picker').classList.remove('show');
    populateTimeSelector();
    document.getElementById('task-time').textContent = 'Select time';
    document.getElementById('event-title').value = '';
    document.getElementById('task-notes').value = '';
    document.getElementById('event-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('event-overlay').style.display = 'none';
}

function openDatePicker() {
    const input = document.getElementById('task-date-input');
    input.value = selectedDate.toISOString().split('T')[0];
    input.click();
}

document.getElementById('task-date-input').addEventListener('change', e => {
    selectedDate = new Date(e.target.value);
    document.getElementById('task-date').textContent = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    generateCalendar();
    updateCalendarHeader();
});

function populateTimeSelector() {
    const container = document.getElementById('time-picker');
    container.innerHTML = '';
    for (let h = 0; h < 24; h++) {
        for (let m of [0, 30]) {
            const hour = h % 12 === 0 ? 12 : h % 12;
            const ampm = h < 12 ? 'AM' : 'PM';
            const time = `${hour}:${m === 0 ? '00' : m} ${ampm}`;
            const div = document.createElement('div');
            div.className = 'time-option';
            div.textContent = time;
            div.onclick = () => selectTime(div);
            container.appendChild(div);
        }
    }
}

function toggleTimePicker() {
    document.getElementById('time-picker').classList.toggle('show');
}

function selectTime(el) {
    selectedTime = el.textContent;
    document.getElementById('task-time').textContent = selectedTime;
    document.getElementById('time-picker').classList.remove('show');
}

function toggleTagPicker() {
    document.getElementById('tag-picker').classList.toggle('show');
}

function selectTag(tagEl) {
    const tagName = tagEl.textContent.trim();
    if (selectedTags.includes(tagName)) return;
    selectedTags.push(tagName);
    const container = document.getElementById('task-tags');
    container.querySelector('.tag-placeholder')?.remove();
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = tagName;
    const bgColor = getComputedStyle(tagEl).backgroundColor || randomColor();
    tag.style.backgroundColor = bgColor;
    tag.style.color = (bgColor === 'rgb(255, 255, 255)') ? 'black' : 'white';
    tag.onclick = () => {
        tag.remove();
        selectedTags = selectedTags.filter(t => t !== tagName);
        if (!container.children.length) container.innerHTML = `<span class="tag-placeholder">None</span>`;
    };
    container.appendChild(tag);
}

function handleNewTag(e) {
    if (e.key !== 'Enter') return;
    const input = e.target;
    const tagName = input.value.trim();
    if (!tagName) return;
    createNewTag(tagName);
    input.value = '';
}

function createNewTag(tagName) {
    const existing = [...document.querySelectorAll('#tag-picker .tag')].some(t => t.textContent.toLowerCase() === tagName.toLowerCase());
    if (existing) return;
    const tag = document.createElement('span');
    tag.className = 'tag custom';
    tag.textContent = tagName;
    tag.onclick = () => selectTag(tag);
    document.getElementById('tag-picker').insertBefore(tag, document.getElementById('new-tag-input'));
    tag.style.backgroundColor = randomColor();
}

const colors = ['#1e90ff', '#ff7f50', '#32cd32', '#9b59b6', '#f39c12'];
function randomColor() { return colors[Math.floor(Math.random() * colors.length)]; }

function randomGradientFromList() {
    const c1 = randomColor();
    let c2 = randomColor();
    while (c1 === c2) { c2 = randomColor(); }
    document.body.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
}

// Fixed SaveEvent: Removed absolute positioning for Hourly/Daily views
function saveEvent() {
    const title = document.getElementById('event-title').value.trim();
    if (!title || !selectedDayCell) return;

    let pill = activeEventPill || document.createElement('div');
    pill.className = 'event-pill';
    pill.textContent = `${selectedTime ? selectedTime + ' • ' : ''}${title}`;

    pill.dataset.title = title;
    pill.dataset.time = selectedTime;
    pill.dataset.notes = document.getElementById('task-notes').value.trim();
    pill.dataset.tags = JSON.stringify(selectedTags);

    // Force standard monthly layout styling
    pill.style.position = 'relative';
    pill.style.top = 'unset';
    pill.style.height = 'auto';
    pill.style.width = '100%';
    pill.style.left = 'unset';
    pill.style.margin = '4px 0';

    if (!activeEventPill) {
        const colors = ['#8da2c1', '#9b59b6', '#a35c5c'];
        pill.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        pill.addEventListener('click', e => {
            e.stopPropagation();
            activeEventPill = pill;
            openEventDetails(pill.dataset.title, pill.dataset.time, pill.dataset.notes, JSON.parse(pill.dataset.tags));
        });
        selectedDayCell.appendChild(pill);
    }
    activeEventPill = null;
    closeModal();
}

function openEventDetails(title, time, notes, tags) {
    document.getElementById('event-details-title').textContent = title;
    document.getElementById('event-details-time').textContent = time ? `Time: ${time}` : 'Time: No Time Set';
    document.getElementById('event-details-tags').textContent = `Tags: ${tags && tags.length ? tags.join(', ') : 'No Tags Set'}`;
    document.getElementById('event-details-notes').textContent = `Notes: ${notes || 'No Notes Added'}`;
    document.getElementById('event-details-overlay').style.display = 'flex';
}

function closeEventDetails() { document.getElementById('event-details-overlay').style.display = 'none'; }

document.getElementById('event-overlay').addEventListener('click', e => { if (e.target.id === 'event-overlay') closeModal(); });
document.getElementById('event-details-overlay').addEventListener('click', e => { if (e.target.id === 'event-details-overlay') closeEventDetails(); });

function deleteEvent() {
    if (!activeEventPill) return;
    activeEventPill.remove();
    activeEventPill = null;
    closeEventDetails();
}

function editEvent() {
    if (!activeEventPill) return;
    const currentTitle = activeEventPill.dataset.title;
    const currentTime = activeEventPill.dataset.time;
    const currentNotes = activeEventPill.dataset.notes;
    const currentTags = JSON.parse(activeEventPill.dataset.tags || "[]");

    document.getElementById('event-title').value = currentTitle;
    document.getElementById('task-notes').value = currentNotes;
    selectedTime = currentTime;
    document.getElementById('task-time').textContent = currentTime || 'Select time';

    selectedTags = currentTags;
    const tagContainer = document.getElementById('task-tags');
    tagContainer.innerHTML = '';
   
    if (selectedTags.length > 0) {
        selectedTags.forEach(tagName => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = tagName;
            tag.style.backgroundColor = randomColor();
            tag.style.color = 'white';
            tag.onclick = () => {
                tag.remove();
                selectedTags = selectedTags.filter(t => t !== tagName);
            };
            tagContainer.appendChild(tag);
        });
    } else {
        tagContainer.innerHTML = `<span class="tag-placeholder">None</span>`;
    }
    closeEventDetails();
    document.getElementById('event-overlay').style.display = 'flex';
}

document.querySelector('.newonetask').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const inputValue = e.target.value.trim();
        if (inputValue !== "") {
            addNewTodo(inputValue);
            e.target.value = '';
        }
    }
});

function addNewTodo(task) {
    const taskList = document.querySelector('.tasklistbox');
    const newTaskInput = document.querySelector('.newonetask');
    const newInputDiv = document.createElement('div');
    newInputDiv.classList.add('checkbox-container');
    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    const newLabel = document.createElement('label');
    newLabel.textContent = task;
    newInputDiv.appendChild(newCheckbox);
    newInputDiv.appendChild(newLabel);
    taskList.insertBefore(newInputDiv, newTaskInput.closest('.checkbox-container'));
    newTaskInput.focus();
}

// Redirects all view changes to the Monthly calendar function
function handleViewChange() {
    calendar();
}

// Schools List (Unchanged)
const schools = [
    { name: "Harvard University", category: "ivy", img: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png" },
    { name: "Yale University", category: "ivy", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/512px-Yale_University_Shield_1.svg.png" },
    { name: "Princeton University", category: "ivy", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/512px-Princeton_seal.svg.png" },
    { name: "Columbia University", category: "ivy", img: "columbia.png" },
    { name: "Brown University", category: "ivy", img: "https://logos-world.net/wp-content/uploads/2022/11/Brown-University-Symbol.png" },
    { name: "Cornell University", category: "ivy", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/512px-Cornell_University_seal.svg.png" },
    { name: "Dartmouth College", category: "ivy", img: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Dartmouth_College_shield.svg/250px-Dartmouth_College_shield.svg.png" },
    { name: "University of Pennsylvania", category: "ivy", img: "https://branding.web-resources.upenn.edu/sites/default/files/styles/card_3x2/public/2022-03/UniversityofPennsylvania_Shield_RGB-2.png?h=3c287ac3&itok=HgG1DNc-" },
    { name: "Stanford University", category: "ivy", img: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png" },
    { name: "MIT", category: "ivy", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/MIT_logo_2003-2023.svg/3840px-MIT_logo_2003-2023.svg.png" },
    { name: "Caltech", category: "ivy", img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_California_Institute_of_Technology.svg/250px-Seal_of_the_California_Institute_of_Technology.svg.png" },
    { name: "UCLA)", category: "nonivy", img: "https://a.espncdn.com/guid/90520a70-9714-8c22-a25d-f33f79c455a2/logos/primary_logo_on_black_color.png" },
    { name: "University of Michigan", category: "nonivy", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/512px-Michigan_Wolverines_logo.svg.png" },
    { name: "UT Austin", category: "nonivy", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Texas_Longhorns_logo.svg/512px-Texas_Longhorns_logo.svg.png" },
    { name: "Arizona State University", category: "nonivy", img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Arizona_State_University_seal.svg/250px-Arizona_State_University_seal.svg.png" }
];

const ivyContainer = document.getElementById("ivyContainer");
const nonIvyContainer = document.getElementById("nonIvyContainer");

if(ivyContainer && nonIvyContainer) {
    schools.forEach(school => {
        const div = document.createElement("div");
        div.className = "school";
        div.innerHTML = `<img src="${school.img}" alt="${school.name}"><span>${school.name}</span>`;
        div.addEventListener("click", () => div.classList.toggle("selected"));
        if (school.category === "ivy") ivyContainer.appendChild(div);
        else nonIvyContainer.appendChild(div);
    });
}

function connectAfterSet() {
    connectSetupComplete = true;
    clear();
    connectlitwo.style.textDecoration = 'underline';
    connectafter.style.display = 'block';
}