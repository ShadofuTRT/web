/** @format */

const form = document.getElementById('registrationForm');

const rules = {
	firstName: {
		required: true,
		min: 2,
		pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
		msg: 'Họ đệm: ít nhất 2 ký tự, chỉ chữ cái',
	},
	lastName: {
		required: true,
		min: 2,
		pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
		msg: 'Tên: ít nhất 2 ký tự, chỉ chữ cái',
	},
	email: {
		required: true,
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		msg: 'Email không hợp lệ',
	},
	password: {
		required: true,
		min: 8,
		pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
		msg: 'Mật khẩu: 8+ ký tự, có chữ hoa, thường, số',
	},
	confirmPassword: {
		required: true,
		match: 'password',
		msg: 'Mật khẩu không khớp',
	},
	phone: { pattern: /^[\+]?[0-9]{10,15}$/, msg: 'Số điện thoại không hợp lệ' },
	birthdate: { required: true, msg: 'Ngày sinh là bắt buộc' },
	gender: { required: true, msg: 'Vui lòng chọn giới tính' },
	terms: { required: true, msg: 'Phải đồng ý điều khoản' },
};

function validate(field, value) {
	const rule = rules[field];
	const errorEl = document.getElementById(field + 'Error');
	const inputEl = document.getElementById(field);

	if (rule.required && !value) {
		showError(errorEl, inputEl, rule.msg);
		return false;
	}

	if (!rule.required && !value) {
		clearError(errorEl, inputEl);
		return true;
	}

	if (rule.match && value !== document.getElementById(rule.match).value) {
		showError(errorEl, inputEl, rule.msg);
		return false;
	}

	if (rule.min && value.length < rule.min) {
		showError(errorEl, inputEl, rule.msg);
		return false;
	}
	if (rule.pattern && !rule.pattern.test(value)) {
		showError(errorEl, inputEl, rule.msg);
		return false;
	}

	if (field === 'birthdate') {
		const today = new Date();
		const birthDate = new Date(value);
		const age = Math.floor(
			(today - birthDate) / (365.25 * 24 * 60 * 60 * 1000)
		);

		if (birthDate >= today) {
			showError(errorEl, inputEl, 'Ngày sinh phải trong quá khứ');
			return false;
		}

		if (age < 13) {
			showError(errorEl, inputEl, 'Phải từ 13 tuổi trở lên');
			return false;
		}

		if (age > 120) {
			showError(errorEl, inputEl, 'Tuổi không hợp lệ');
			return false;
		}
	}

	if (field === 'terms' && !document.getElementById('terms').checked) {
		showError(errorEl, inputEl, rule.msg);
		return false;
	}

	showSuccess(errorEl, inputEl);
	return true;
}

function showError(errorEl, inputEl, msg) {
	errorEl.textContent = msg;
	inputEl.className =
		inputEl.className.replace(/\s*(valid|invalid)/g, '') + ' invalid';
}

function showSuccess(errorEl, inputEl) {
	errorEl.textContent = '';
	inputEl.className =
		inputEl.className.replace(/\s*(valid|invalid)/g, '') + ' valid';
}

function clearError(errorEl, inputEl) {
	errorEl.textContent = '';
	inputEl.className = inputEl.className.replace(/\s*(valid|invalid)/g, '');
}

Object.keys(rules).forEach((field) => {
	const input = document.getElementById(field);
	const eventType =
		field === 'terms' ? 'change' : field === 'gender' ? 'change' : 'input';

	input.addEventListener(eventType, () => {
		const value = field === 'terms' ? input.checked : input.value;
		validate(field, value);
	});
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	let isValid = true;
	Object.keys(rules).forEach((field) => {
		const input = document.getElementById(field);
		const value = field === 'terms' ? input.checked : input.value;
		if (!validate(field, value)) isValid = false;
	});

	if (isValid) {
		// If validation passes, submit to PHP
		form.submit();
	} else {
		// Focus on first invalid field if validation fails
		const firstInvalidField = Object.keys(rules).find((field) =>
			document.getElementById(field).classList.contains('invalid')
		);
		if (firstInvalidField) {
			document.getElementById(firstInvalidField).focus();
		}
	}
});
