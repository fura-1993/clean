// メインJavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダー初期化
    initHeader();
    
    // お客様の声スライダー初期化
    initTestimonials();
    
    // FAQアコーディオン初期化
    initFaq();
    
    // フォームバリデーション初期化
    initFormValidation();

    // AOS 初期化
    AOS.init();

    // Rellax 初期化
    if(document.querySelector('.rellax')) {
        var rellax = new Rellax('.rellax');
    }
});

// ヘッダー初期化
function initHeader() {
    // ハンバーガーメニューの動作
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
    
    // スクロール時のヘッダースタイル変更
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // ハッシュリンクの場合のみ処理
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // モバイルメニューが開いていれば閉じる
                    if (hamburger && mobileNav && hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        mobileNav.classList.remove('active');
                    }
                    
                    // ターゲット要素までスクロール
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// お客様の声スライダー初期化
function initTestimonials() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!testimonialItems.length) return;
    
    let currentIndex = 0;
    
    // 初期状態では最初のスライドのみ表示
    testimonialItems.forEach((item, index) => {
        if (index !== 0) {
            item.style.display = 'none';
        }
    });
    
    // スライドを切り替える関数
    function showSlide(index) {
        testimonialItems.forEach(item => {
            item.style.display = 'none';
            item.style.animation = '';
        });
        
        testimonialItems[index].style.display = 'block';
        testimonialItems[index].style.animation = 'fadeIn 0.5s forwards';
        
        // ドットの状態を更新
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // 次のスライドへ
    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= testimonialItems.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // 前のスライドへ
    function prevSlide() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialItems.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // イベントリスナー設定
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // ドットクリックでスライド移動
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 自動切り替え（5秒ごと）
    setInterval(nextSlide, 5000);
}

// FAQアコーディオン初期化
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 現在アクティブなアイテムを閉じる
            const currentActive = document.querySelector('.faq-item.active');
            if (currentActive && currentActive !== item) {
                currentActive.classList.remove('active');
            }
            
            // クリックされたアイテムの状態を切り替え
            item.classList.toggle('active');
        });
    });
}

// フォームバリデーション初期化
function initFormValidation() {
    const form = document.getElementById('inquiry-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 入力値を取得
        const formData = {
            name: form.elements.name.value.trim(),
            email: form.elements.email.value.trim(),
            phone: form.elements.phone.value.trim(),
            service: form.elements.service.value,
            address: form.elements.address.value.trim(),
            message: form.elements.message.value.trim(),
            privacy: form.elements.privacy.checked
        };
        
        // バリデーション
        const errors = validateFormData(formData);
        
        // エラー表示をリセット
        resetFormErrors(form);
        
        // エラーがある場合
        if (Object.keys(errors).length > 0) {
            displayFormErrors(form, errors);
            return;
        }
        
        // フォーム送信処理（実際の環境ではAPIリクエスト等を行う）
        submitForm(formData);
    });
}

function validateFormData(data) {
    const errors = {};
    
    // 名前のバリデーション
    if (!data.name) {
        errors.name = 'お名前を入力してください';
    }
    
    // メールアドレスのバリデーション
    if (!data.email) {
        errors.email = 'メールアドレスを入力してください';
    } else if (!isValidEmail(data.email)) {
        errors.email = '正しいメールアドレスを入力してください';
    }
    
    // 電話番号のバリデーション
    if (!data.phone) {
        errors.phone = '電話番号を入力してください';
    } else if (!isValidPhone(data.phone)) {
        errors.phone = '正しい電話番号を入力してください';
    }
    
    // サービスのバリデーション
    if (!data.service) {
        errors.service = 'ご希望のサービスを選択してください';
    }
    
    // メッセージのバリデーション
    if (!data.message) {
        errors.message = 'お問い合わせ内容を入力してください';
    }
    
    // プライバシーポリシー同意のバリデーション
    if (!data.privacy) {
        errors.privacy = 'プライバシーポリシーに同意してください';
    }
    
    return errors;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPhone(phone) {
    // 数字、ハイフン、括弧、空白を許可
    const regex = /^[0-9\-\(\)\s]+$/;
    return regex.test(phone);
}

function resetFormErrors(form) {
    // エラーメッセージを削除
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());
    
    // エラースタイルをリセット
    const formElements = form.querySelectorAll('input, select, textarea');
    formElements.forEach(el => {
        el.classList.remove('error');
    });
}

function displayFormErrors(form, errors) {
    // 各エラーに対して処理
    Object.keys(errors).forEach(fieldName => {
        const field = form.elements[fieldName];
        const errorMessage = errors[fieldName];
        
        // フィールドにエラースタイルを追加
        field.classList.add('error');
        
        // エラーメッセージを表示
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--red)';
        errorElement.style.fontSize = '1.2rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.textContent = errorMessage;
        
        // チェックボックスの場合は親要素の後に追加
        if (field.type === 'checkbox') {
            field.parentElement.parentElement.appendChild(errorElement);
        } else {
            field.parentElement.appendChild(errorElement);
        }
    });
}

function submitForm(formData) {
    // ここで実際のフォーム送信処理を行う
    // 今回はデモのため、成功メッセージを表示するだけ
    
    const form = document.getElementById('inquiry-form');
    const successMessage = document.getElementById('form-success');
    
    // 送信中の状態を表示（実際の実装では必要に応じて）
    form.classList.add('submitting');
    
    // 擬似的な送信遅延（実際の実装では削除）
    setTimeout(() => {
        // フォームを非表示にして成功メッセージを表示
        form.style.display = 'none';
        successMessage.classList.add('active');
        
        // フォームをリセット
        form.reset();
    }, 1000);
}