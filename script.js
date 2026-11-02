// Mithon Mondol Demo Accounts
const mmAccounts = {
  owner: {
    id: "100001",
    password: "123456",
    name: "মালিক",
    role: "Owner"
  },
  manager: {
    id: "200001",
    password: "123456",
    name: "ম্যানেজার",
    role: "Manager"
  },
  worker: {
    id: "300001",
    password: "123456",
    name: "কর্মচারী",
    role: "Worker"
  }
};

let mmCurrentUser = null;

const mmMenus = [
  { id: "sales", icon: "💰", name: "দৈনিক বিক্রি", roles: ["owner", "manager"] },
  { id: "employee", icon: "👨‍🍳", name: "কর্মচারী", roles: ["owner", "manager"] },
  { id: "attendance", icon: "🕒", name: "হাজিরা ও Duty", roles: ["owner", "manager", "worker"] },
  { id: "salary", icon: "💵", name: "বেতন হিসাব", roles: ["owner", "manager"] },
  { id: "due", icon: "📒", name: "বাকি হিসাব", roles: ["owner", "manager"] },
  { id: "expense", icon: "🛒", name: "বাজার খরচ", roles: ["owner", "manager"] },
  { id: "payment", icon: "💳", name: "পেমেন্ট", roles: ["owner", "manager"] },
  { id: "report", icon: "📊", name: "রিপোর্ট", roles: ["owner"] },
  { id: "control", icon: "🔐", name: "Manager নিয়ন্ত্রণ", roles: ["owner"] }
];

function mmLogin() {
  const role = document.getElementById("userRole").value;
  const id = document.getElementById("loginId").value.trim();
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  const account = mmAccounts[role];

  if (id === account.id && password === account.password) {
    mmCurrentUser = role;

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("welcomeTitle").innerText =
      "স্বাগতম, " + account.name;

    document.getElementById("welcomeText").innerText =
      "আপনি " + account.role + " হিসেবে প্রবেশ করেছেন।";

    mmShowMenus();
    mmShowPage("home");

    message.innerText = "";
  } else {
    message.style.color = "red";
    message.innerText = "ভুল ID অথবা Password!";
  }
}

function mmShowMenus() {
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = "";

  mmMenus.forEach(item => {
    if (item.roles.includes(mmCurrentUser)) {
      const button = document.createElement("button");
      button.className = "menu-btn";
      button.innerText = item.icon + " " + item.name;
      button.onclick = () => mmShowPage(item.id);
      grid.appendChild(button);
    }
  });
}

function mmShowPage(page) {
  const content = document.getElementById("page");

  const pages = {
    home: `
      <h3>🏠 Dashboard</h3>
      <p>আপনার কাজের মেনু থেকে একটি বিভাগ নির্বাচন করুন।</p>
    `,
    sales: `
      <h3>💰 দৈনিক বিক্রি</h3>
      <p>এখানে দৈনিক বিক্রির হিসাব তৈরি হবে।</p>
      <input type="number" placeholder="বিক্রির টাকা">
      <button class="primary-btn" onclick="mmDemoMessage('বিক্রির হিসাব')">হিসাব সংরক্ষণ</button>
    `,
    employee: `
      <h3>👨‍🍳 কর্মচারী ব্যবস্থাপনা</h3>
      <p>কর্মচারীর নাম, ID, ছবি ও তথ্য এখানে যোগ হবে।</p>
      <input type="text" placeholder="কর্মচারীর নাম">
      <input type="text" placeholder="কর্মচারীর ID">
      <button class="primary-btn" onclick="mmDemoMessage('কর্মচারী')">যোগ করুন</button>
    `,
    attendance: `
      <h3>🕒 হাজিরা ও Duty</h3>
      <p>কর্মচারীর উপস্থিতি ও In/Out সময়ের হিসাব।</p>
      <button class="primary-btn" onclick="mmDemoMessage('Duty In')">Duty In</button>
      <button class="primary-btn" onclick="mmDemoMessage('Duty Out')">Duty Out</button>
    `,
    salary: `
      <h3>💵 বেতন হিসাব</h3>
      <p>কর্মচারীদের মাসিক বেতনের হিসাব।</p>
    `,
    due: `
      <h3>📒 বাকি হিসাব</h3>
      <p>কাস্টমারের বাকি ও মাসিক বিলের হিসাব।</p>
    `,
    expense: `
      <h3>🛒 বাজার খরচ</h3>
      <p>দৈনিক বাজার ও অন্যান্য খরচের হিসাব।</p>
    `,
    payment: `
      <h3>💳 পেমেন্ট হিসাব</h3>
      <p>bKash Personal, Nagad ও Hand Cash-এর হিসাব।</p>
    `,
    report: `
      <h3>📊 রিপোর্ট</h3>
      <p>দৈনিক বিক্রি, খরচ ও লাভ-ক্ষতির রিপোর্ট।</p>
    `,
    control: `
      <h3>🔐 Manager নিয়ন্ত্রণ</h3>
      <p>Manager-এর অনুমতি ও কাজের নিয়ন্ত্রণ এখানে তৈরি হবে।</p>
      <button class="primary-btn" onclick="mmDemoMessage('Manager অনুমতি')">Manager অনুমতি দিন</button>
    `
  };

  content.innerHTML = pages[page] || pages.home;
}

function mmDemoMessage(section) {
  alert(section + " বিভাগটি পরের ধাপে কার্যকর করা হবে।");
}

function mmLogout() {
  mmCurrentUser = null;

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("loginScreen").style.display = "block";

  document.getElementById("loginId").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("loginMessage").innerText = "";
}
// Mithon Mondol Functional Features
let mmData = JSON.parse(localStorage.getItem("mmData") || '{"sales":[],"workers":[],"attendance":[],"dues":[],"expenses":[],"payments":[]}');

function mmSave() {
  localStorage.setItem("mmData", JSON.stringify(mmData));
}

function mmMoney(value) {
  return Number(value || 0).toLocaleString("en-BD");
}

function mmShowPage(page) {
  const content = document.getElementById("page");

  const forms = {
    sales: `
      <h3>💰 দৈনিক বিক্রি</h3>
      <input id="mmSaleAmount" type="number" placeholder="বিক্রির টাকা">
      <button class="primary-btn" onclick="mmAdd('sales','mmSaleAmount')">বিক্রি Save</button>
      <p>মোট বিক্রি: ৳ ${mmMoney(mmData.sales.reduce((a,b)=>a+b.amount,0))}</p>
      ${mmList("sales")}
    `,
    employee: `
      <h3>👨‍🍳 কর্মচারী যোগ</h3>
      <input id="mmWorkerName" placeholder="কর্মচারীর নাম">
      <input id="mmWorkerId" placeholder="কর্মচারী ID">
      <button class="primary-btn" onclick="mmAddWorker()">কর্মচারী Save</button>
      ${mmData.workers.map(w=>`<p>${w.name} — ${w.id}</p>`).join("")}
    `,
    attendance: `
      <h3>🕒 হাজিরা ও Duty</h3>
      <input id="mmDutyId" placeholder="কর্মচারীর ID">
      <button class="primary-btn" onclick="mmDuty('In')">Duty In</button>
      <button class="primary-btn" onclick="mmDuty('Out')">Duty Out</button>
      ${mmData.attendance.map(a=>`<p>${a.id} — ${a.status} — ${a.time}</p>`).join("")}
    `,
    salary: `
      <h3>💵 বেতন হিসাব</h3>
      <input id="mmSalaryId" placeholder="কর্মচারীর ID">
      <input id="mmSalaryAmount" type="number" placeholder="বেতনের টাকা">
      <button class="primary-btn" onclick="mmSalary()">বেতন হিসাব</button>
      <div id="mmSalaryResult"></div>
    `,
    due: `
      <h3>📒 কাস্টমারের বাকি</h3>
      <input id="mmDueName" placeholder="কাস্টমারের নাম">
      <input id="mmDueAmount" type="number" placeholder="বাকি টাকা">
      <button class="primary-btn" onclick="mmAddDue()">বাকি Save</button>
      <p>মোট বাকি: ৳ ${mmMoney(mmData.dues.reduce((a,b)=>a+b.amount,0))}</p>
      ${mmList("dues")}
    `,
    expense: `
      <h3>🛒 বাজার খরচ</h3>
      <input id="mmExpenseName" placeholder="খরচের বিবরণ">
      <input id="mmExpenseAmount" type="number" placeholder="টাকা">
      <button class="primary-btn" onclick="mmAddExpense()">খরচ Save</button>
      <p>মোট খরচ: ৳ ${mmMoney(mmData.expenses.reduce((a,b)=>a+b.amount,0))}</p>
      ${mmList("expenses")}
    `,
    payment: `
      <h3>💳 পেমেন্ট</h3>
      <input id="mmPayName" placeholder="নাম">
      <input id="mmPayAmount" type="number" placeholder="টাকা">
      <select id="mmPayMethod">
        <option>bKash Personal</option>
        <option>Nagad</option>
        <option>Hand Cash</option>
      </select>
      <button class="primary-btn" onclick="mmAddPayment()">পেমেন্ট Save</button>
      ${mmData.payments.map(p=>`<p>${p.name}: ৳${mmMoney(p.amount)} (${p.method})</p>`).join("")}
    `,
    report: `
      <h3>📊 হিসাব রিপোর্ট</h3>
      <p>মোট বিক্রি: ৳ ${mmMoney(mmData.sales.reduce((a,b)=>a+b.amount,0))}</p>
      <p>মোট খরচ: ৳ ${mmMoney(mmData.expenses.reduce((a,b)=>a+b.amount,0))}</p>
      <p>আনুমানিক লাভ: ৳ ${mmMoney(mmData.sales.reduce((a,b)=>a+b.amount,0)-mmData.expenses.reduce((a,b)=>a+b.amount,0))}</p>
      <p>মোট বাকি: ৳ ${mmMoney(mmData.dues.reduce((a,b)=>a+b.amount,0))}</p>
    `,
    control: `
      <h3>🔐 Manager নিয়ন্ত্রণ</h3>
      <p>Manager ID: 200001</p>
      <button class="primary-btn" onclick="alert('এটি Demo অনুমতি। আসল অনুমতি Supabase দিয়ে চালু হবে।')">Manager অনুমতি</button>
    `
  };

  if (page === "home") {
    content.innerHTML = "<h3>🏠 Dashboard</h3><p>একটি বিভাগ নির্বাচন করুন।</p>";
  } else if (forms[page]) {
    content.innerHTML = forms[page];
  }
}

function mmList(type) {
  return mmData[type].map(x =>
    `<p>${x.name || "হিসাব"} — ৳ ${mmMoney(x.amount)}</p>`
  ).join("");
}

function mmAdd(type, inputId) {
  const amount = Number(document.getElementById(inputId).value);
  if (!amount || amount <= 0) return alert("সঠিক টাকা লিখুন।");
  mmData[type].push({amount, time:new Date().toLocaleString()});
  mmSave();
  mmShowPage(type === "sales" ? "sales" : type);
}

function mmAddWorker() {
  const name = document.getElementById("mmWorkerName").value.trim();
  const id = document.getElementById("mmWorkerId").value.trim();
  if (!name || !id) return alert("নাম ও ID লিখুন।");
  if (mmData.workers.some(w=>w.id===id)) return alert("এই ID আগে আছে।");
  mmData.workers.push({name,id});
  mmSave();
  mmShowPage("employee");
}

function mmDuty(status) {
  const id = document.getElementById("mmDutyId").value.trim();
  if (!id) return alert("কর্মচারীর ID লিখুন।");
  if (!mmData.workers.some(w=>w.id===id)) return alert("আগে কর্মচারী যোগ করুন।");
  mmData.attendance.push({id,status,time:new Date().toLocaleString()});
  mmSave();
  mmShowPage("attendance");
}

function mmAddDue() {
  const name = document.getElementById("mmDueName").value.trim();
  const amount = Number(document.getElementById("mmDueAmount").value);
  if (!name || amount<=0) return alert("নাম ও সঠিক টাকা লিখুন।");
  mmData.dues.push({name,amount});
  mmSave();
  mmShowPage("due");
}

function mmAddExpense() {
  const name = document.getElementById("mmExpenseName").value.trim();
  const amount = Number(document.getElementById("mmExpenseAmount").value);
  if (!name || amount<=0) return alert("বিবরণ ও সঠিক টাকা লিখুন।");
  mmData.expenses.push({name,amount});
  mmSave();
  mmShowPage("expense");
}

function mmAddPayment() {
  const name = document.getElementById("mmPayName").value.trim();
  const amount = Number(document.getElementById("mmPayAmount").value);
  const method = document.getElementById("mmPayMethod").value;
  if (!name || amount<=0) return alert("নাম ও সঠিক টাকা লিখুন।");
  mmData.payments.push({name,amount,method});
  mmSave();
  mmShowPage("payment");
}

function mmSalary() {
  const id = document.getElementById("mmSalaryId").value.trim();
  const amount = Number(document.getElementById("mmSalaryAmount").value);
  const worker = mmData.workers.find(w=>w.id===id);
  if (!worker || amount<=0) return alert("সঠিক কর্মচারী ID ও বেতন দিন।");
  document.getElementById("mmSalaryResult").innerText =
    worker.name + " এর বেতন: ৳ " + mmMoney(amount);
}
