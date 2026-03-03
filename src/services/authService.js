const USERS_KEY = "nfx_users";

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signupUser({ fullName, email, password }) {
  const users = loadUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    return { ok: false, message: "Email already registered." };
  }

  const newUser = {
    id: crypto.randomUUID(),
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  return {
    ok: true,
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
    },
  };
}

export function loginUser({ email, password }) {
  const users = loadUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const matchedUser = users.find(
    (user) => user.email === normalizedEmail && user.password === password
  );

  if (!matchedUser) {
    return { ok: false, message: "Invalid email or password." };
  }

  return {
    ok: true,
    user: {
      id: matchedUser.id,
      fullName: matchedUser.fullName,
      email: matchedUser.email,
    },
  };
}
