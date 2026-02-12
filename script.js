/* ==============================================
   SCRIPT.JS - FIXED VERSION
   ============================================== */

// 1. КОНФИГУРАЦИЯ SUPABASE
const SUPABASE_URL = 'https://itqlqsixknkqoggvubrp.supabase.co'; 
// Используем ваш Anon Public Key (не Service Role!)
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0cWxxc2l4a25rcW9nZ3Z1YnJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MjE3MDIsImV4cCI6MjA4NjQ5NzcwMn0.mV0As50_W8MBC3kpLYm_mLbExqRRyf8JaJi1eNOtAj4'; 

// ВАЖНО: Называем переменную sb, чтобы не было конфликта с window.supabase
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. TELEGRAM INIT
const tg = window.Telegram && window.Telegram.WebApp 
    ? window.Telegram.WebApp 
    : { 
        initDataUnsafe: { user: { id: 0, first_name: "BrowserUser", username: "browser_test" } }, 
        expand: () => console.log("TG Expand"), 
        HapticFeedback: { notificationOccurred: (t) => console.log("Haptic:", t) },
        openLink: (url) => window.open(url, '_blank'),
        openTelegramLink: (url) => window.open(url, '_blank')
      };

// 3. CONFIG
// Ссылка на ваш Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbyeXKjp0y4KdFvpIBYHHMmD48uWRtYHaSHb6iwJfNT5g87oCT9cVFREMGFqFWJua25b/exec"; 

const TOPICS = { WITHDRAW: 2, DEPOSIT: 4, LOGS: 8 }; 
const SUB_CHANNEL_URL = "https://t.me/blackrussiacases_news"; 
const PLACEHOLDER_IMG = "https://placehold.co/150x150/1a1a1a/ffffff?text=No+Image";
const VIRT_RATE = 10000; 

function getVirtPrice(rub) { return (rub * VIRT_RATE).toLocaleString() + ' Вирт'; }

const RARITY_VALS = { 'consumer': 1, 'common': 2, 'rare': 3, 'epic': 4, 'legendary': 5, 'mythical': 6 };
const RARITY_COLORS = { 'consumer': '#B0B0B0', 'common': '#4CAF50', 'rare': '#3b82f6', 'epic': '#a855f7', 'legendary': '#eab308', 'mythical': '#ff3333' };

// Сюда вставлять данные из админки (GAME_CONFIG и PROMO_CODES)
    {
        "id": "sub_case_1",
        "name": "Раз в ДВА ДНЯ! (За подписку)",
        "price": 0,
        "category": "free",
        "img": "img/free_case.png",
        "chances": {
            "consumer": 40,
            "common": 30,
            "rare": 20,
            "epic": 8,
            "legendary": 2,
            "mythical": 0
        },
        "items": [
            {
                "name": "50.000 Вирт",
                "price": 5,
                "img": "img/money.png",
                "rarity": "consumer"
            },
            {
                "name": "100.000 Вирт",
                "price": 10,
                "img": "img/money.png",
                "rarity": "common"
            },
            {
                "name": "BMW M5 F90",
                "price": 400,
                "img": "img/m5f90.png",
                "rarity": "legendary"
            },
            {
                "name": "Маска Демона",
                "price": 150,
                "img": "img/demon.png",
                "rarity": "epic"
            },
            {
                "name": "Аптечка",
                "price": 7,
                "img": "img/aptechka.png",
                "rarity": "consumer"
            },
            {
                "name": "10 BC",
                "price": 10,
                "img": "img/bc.png",
                "rarity": "common"
            }
        ]
    },
    {
        "id": 1,
        "name": "Кейс Бомжа",
        "price": 29,
        "category": "default",
        "img": "img/bomj_case.png",
        "chances": {
            "consumer": 50,
            "common": 38,
            "rare": 8,
            "epic": 3,
            "legendary": 1,
            "mythical": 1
        },
        "items": [
            {
                "name": "50.000 Вирт",
                "price": 5,
                "img": "img/money.png",
                "rarity": "consumer"
            },
            {
                "name": "150.000 Вирт",
                "price": 15,
                "img": "img/money.png",
                "rarity": "common"
            },
            {
                "name": "400.000 Вирт",
                "price": 40,
                "img": "img/money.png",
                "rarity": "epic"
            },
            {
                "name": "5.000.000 Вирт",
                "price": 500,
                "img": "img/money.png",
                "rarity": "legendary"
            },
            {
                "name": "Очки «Сердечки»",
                "price": 500,
                "img": "img/heartglass.png",
                "rarity": "legendary"
            },
            {
                "name": "Серый кейс",
                "price": 500,
                "img": "img/graycase.png",
                "rarity": "legendary"
            },
            {
                "name": "Маска Дали",
                "price": 70,
                "img": "img/dali.png",
                "rarity": "rare"
            },
            {
                "name": "Очки «Street»",
                "price": 19,
                "img": "img/streetglass.png",
                "rarity": "consumer"
            },
            {
                "name": "Скин «Емеля»",
                "price": 300,
                "img": "img/emelya.png",
                "rarity": "epic"
            },
            {
                "name": "Скин «Пузатый»",
                "price": 10,
                "img": "img/pyzatiy.png",
                "rarity": "consumer"
            },
            {
                "name": "Набор «Сельчанин»",
                "price": 70,
                "img": "img/pack_selchanin.png",
                "rarity": "rare"
            },
            {
                "name": "Набор «Бандит»",
                "price": 650,
                "img": "img/pack_bandit.png",
                "rarity": "legendary"
            },
            {
                "name": "ZAZ",
                "price": 15,
                "img": "img/zaz.png",
                "rarity": "consumer"
            },
            {
                "name": "VAZ 2107",
                "price": 30,
                "img": "img/2107.png",
                "rarity": "common"
            },
            {
                "name": "LADA NIVA",
                "price": 80,
                "img": "img/niva.png",
                "rarity": "rare"
            },
            {
                "name": "LADA VESTA",
                "price": 175,
                "img": "img/vesta.png",
                "rarity": "epic"
            },
            {
                "name": "Mercedes-Benz W210",
                "price": 300,
                "img": "img/w210.png",
                "rarity": "legendary"
            },
            {
                "name": "10 BC",
                "price": 10,
                "img": "img/bc.png",
                "rarity": "consumer"
            },
            {
                "name": "25 BC",
                "price": 25,
                "img": "img/bc.png",
                "rarity": "consumer"
            },
            {
                "name": "50 BC",
                "price": 50,
                "img": "img/bc.png",
                "rarity": "common"
            },
            {
                "name": "500 BC",
                "price": 500,
                "img": "img/bc.png",
                "rarity": "legendary"
            },
            {
                "name": "Аптечка",
                "price": 7,
                "img": "img/aptechka.png",
                "rarity": "consumer"
            },
            {
                "name": "Ремонтный набор",
                "price": 7,
                "img": "img/remka.png",
                "rarity": "consumer"
            },
            {
                "name": "Скутер",
                "price": 15,
                "img": "img/skuter.png",
                "rarity": "common"
            }
        ]
    },
    {
        "id": 1770544149013,
        "name": "Стандартный Кейс",
        "price": 199,
        "category": "default",
        "img": "img/standart_case.png",
        "chances": {
            "consumer": 0,
            "common": 60,
            "rare": 34,
            "epic": 5,
            "legendary": 1,
            "mythical": 0
        },
        "items": [
            {
                "name": "Скин «Хоуми»",
                "price": 59,
                "img": "img/homie.png",
                "rarity": "common"
            },
            {
                "name": "Скин «Опасный мужчина»",
                "price": 69,
                "img": "img/dangerman.png",
                "rarity": "common"
            },
            {
                "name": "Скин «Рыбчка»",
                "price": 89,
                "img": "img/ribachka.png",
                "rarity": "common"
            },
            {
                "name": "Рюкзак «Мопс»",
                "price": 79,
                "img": "img/mops.png",
                "rarity": "common"
            },
            {
                "name": "Корона короля",
                "price": 249,
                "img": "img/korona.png",
                "rarity": "epic"
            },
            {
                "name": "Маска «Иноске»",
                "price": 129,
                "img": "img/inoske.png",
                "rarity": "epic"
            },
            {
                "name": "Volkswagel Golf GTi",
                "price": 99,
                "img": "img/golf.png",
                "rarity": "common"
            },
            {
                "name": "BMW X5",
                "price": 219,
                "img": "img/x5.png",
                "rarity": "rare"
            },
            {
                "name": "Nissan Qashqai",
                "price": 199,
                "img": "img/qashqai.png",
                "rarity": "rare"
            },
            {
                "name": "Audi A4",
                "price": 199,
                "img": "img/a4.png",
                "rarity": "rare"
            },
            {
                "name": "Acura TSX",
                "price": 199,
                "img": "img/tsx.png",
                "rarity": "rare"
            },
            {
                "name": "Chevrolet Camaro ZL1",
                "price": 999,
                "img": "img/camaro.png",
                "rarity": "epic"
            },
            {
                "name": "Ducati SuperSport",
                "price": 799,
                "img": "img/supersport.png",
                "rarity": "epic"
            },
            {
                "name": "Lamborghini Aventador S",
                "price": 2999,
                "img": "img/aventador.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes AMG GT-R",
                "price": 1999,
                "img": "img/gtr.png",
                "rarity": "legendary"
            },
            {
                "name": "100 BC",
                "price": 100,
                "img": "img/bc.png",
                "rarity": "common"
            },
            {
                "name": "200 BC",
                "price": 200,
                "img": "img/bc.png",
                "rarity": "rare"
            }
        ]
    },
    {
        "id": 1770550347497,
        "name": "Авто-Кейс 2.0",
        "price": 999,
        "category": "default",
        "img": "img/auto_case.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 86,
            "epic": 13,
            "legendary": 1,
            "mythical": 0
        },
        "items": [
            {
                "name": "BMW M5 E60",
                "price": 499,
                "img": "img/m5e60.png",
                "rarity": "rare"
            },
            {
                "name": "Subaru WRX STi",
                "price": 549,
                "img": "img/wrx.png",
                "rarity": "rare"
            },
            {
                "name": "Toyota Camry 3.5",
                "price": 599,
                "img": "img/camry.png",
                "rarity": "rare"
            },
            {
                "name": "Volkswagen Passat",
                "price": 719,
                "img": "img/passat.png",
                "rarity": "rare"
            },
            {
                "name": "Mercedes-Benz GT63s",
                "price": 1199,
                "img": "img/gt63s.png",
                "rarity": "epic"
            },
            {
                "name": "Lamborghini Aventador S",
                "price": 4999,
                "img": "img/aventador.png",
                "rarity": "legendary"
            },
            {
                "name": "Aurus Senat",
                "price": 6999,
                "img": "img/senat.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz G63 AMG",
                "price": 5499,
                "img": "img/g63.png",
                "rarity": "legendary"
            },
            {
                "name": "Bugatti Divo",
                "price": 19999,
                "img": "img/divo.png",
                "rarity": "mythical"
            },
            {
                "name": "Lamborghini Urus",
                "price": 3799,
                "img": "img/urus.png",
                "rarity": "epic"
            },
            {
                "name": "Lamborghini Huracan",
                "price": 2999,
                "img": "img/huracan.png",
                "rarity": "epic"
            },
            {
                "name": "BMW M4 F84",
                "price": 739,
                "img": "img/m4f84.png",
                "rarity": "rare"
            },
            {
                "name": "XPENG P7",
                "price": 999,
                "img": "img/p7.png",
                "rarity": "rare"
            },
            {
                "name": "BMW X6M F16",
                "price": 1999,
                "img": "img/x6mf16.png",
                "rarity": "epic"
            },
            {
                "name": "Alfa Romeo Guilia",
                "price": 699,
                "img": "img/romeo.png",
                "rarity": "rare"
            },
            {
                "name": "BMW X5M E70",
                "price": 799,
                "img": "img/x5me70.png",
                "rarity": "rare"
            },
            {
                "name": "Ducatti Supersport",
                "price": 699,
                "img": "img/supersport.png",
                "rarity": "rare"
            }
        ]
    },
    {
        "id": 1770563185594,
        "name": "Особый Кейс",
        "price": 3999,
        "category": "default",
        "img": "img/osobiy_case.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 0,
            "epic": 0,
            "legendary": 99.9,
            "mythical": 0.1
        },
        "items": [
            {
                "name": "Ocean Yacht",
                "price": 19999,
                "img": "img/ocean.png",
                "rarity": "mythical"
            },
            {
                "name": "Rolls Royce Spectre",
                "price": 29999,
                "img": "img/spectre.png",
                "rarity": "mythical"
            },
            {
                "name": "Tesla CyberTruck",
                "price": 19999,
                "img": "img/cybertruck.png",
                "rarity": "mythical"
            },
            {
                "name": "Mercedes-Benz G63 AMG 6x6",
                "price": 39999,
                "img": "img/g636x6.png",
                "rarity": "mythical"
            },
            {
                "name": "Bugatti Chiron",
                "price": 19999,
                "img": "img/chiron.png",
                "rarity": "mythical"
            },
            {
                "name": "Bugatti Veyron",
                "price": 24999,
                "img": "img/veyron.png",
                "rarity": "mythical"
            },
            {
                "name": "Ferrari Enzo",
                "price": 3999,
                "img": "img/enzo.png",
                "rarity": "legendary"
            },
            {
                "name": "Daewoo Matiz",
                "price": 2999,
                "img": "img/matiz.png",
                "rarity": "legendary"
            },
            {
                "name": "Ducati XDiavel",
                "price": 1499,
                "img": "img/xdiavel.png",
                "rarity": "legendary"
            },
            {
                "name": "Lamborghini Urus",
                "price": 3799,
                "img": "img/urus.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz G63 AMG Max",
                "price": 5999,
                "img": "img/g63.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz SLR McLaren",
                "price": 3999,
                "img": "img/slrmclaren.png",
                "rarity": "legendary"
            },
            {
                "name": "Lamborghini Aventador",
                "price": 4999,
                "img": "img/aventador.png",
                "rarity": "legendary"
            },
            {
                "name": "Зловещий",
                "price": 1999,
                "img": "img/zloveshiy.png",
                "rarity": "legendary"
            },
            {
                "name": "Invetero Coquette D5",
                "price": 2999,
                "img": "img/coquette.png",
                "rarity": "legendary"
            },
            {
                "name": "F1",
                "price": 2999,
                "img": "img/f1.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz AMG GT-R",
                "price": 3299,
                "img": "img/gtr.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770583808350,
        "name": "Кейс с Наборами",
        "price": 269,
        "category": "bundles",
        "img": "img/pack_case.png",
        "chances": {
            "consumer": 0,
            "common": 70,
            "rare": 23,
            "epic": 5,
            "legendary": 1,
            "mythical": 0.08
        },
        "items": [
            {
                "name": "Набор «Сельчанин»",
                "price": 79,
                "img": "img/pack_selchanin.png",
                "rarity": "common"
            },
            {
                "name": "Набор «Бандит»",
                "price": 169,
                "img": "img/pack_bandit.png",
                "rarity": "common"
            },
            {
                "name": "Набор «Молодой»",
                "price": 189,
                "img": "img/pack_molodoy.png",
                "rarity": "common"
            },
            {
                "name": "Набор «Гангстер»",
                "price": 269,
                "img": "img/pack_gangster.png",
                "rarity": "rare"
            },
            {
                "name": "Набор «Гонщик»",
                "price": 399,
                "img": "img/pack_racer.png",
                "rarity": "rare"
            },
            {
                "name": "Набор «Депутат»",
                "price": 599,
                "img": "img/pack_deputat.png",
                "rarity": "epic"
            },
            {
                "name": "Набор «Мафиози»",
                "price": 1199,
                "img": "img/pack_mafiozi.png",
                "rarity": "epic"
            },
            {
                "name": "Набор «Мажор»",
                "price": 2999,
                "img": "img/pack_major.png",
                "rarity": "legendary"
            },
            {
                "name": "Набор «Арни и Буши»",
                "price": 4999,
                "img": "img/pack_aarnebushi.png",
                "rarity": "legendary"
            },
            {
                "name": "Набор «Охотник»",
                "price": 1999,
                "img": "img/pack_hunter.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770584844771,
        "name": "Всё или Ничего?",
        "price": 19,
        "category": "risk",
        "img": "img/allorno_case.png",
        "chances": {
            "consumer": 99.85,
            "common": 0,
            "rare": 0,
            "epic": 0,
            "legendary": 0.15,
            "mythical": 0
        },
        "items": [
            {
                "name": "Аптечка",
                "price": 7,
                "img": "img/aptechka.png",
                "rarity": "consumer"
            },
            {
                "name": "Lamborghini Huracan",
                "price": 3999,
                "img": "img/huracan.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770627365851,
        "name": "Денежный Кейс",
        "price": 29,
        "category": "bundles",
        "img": "img/money_case.png",
        "chances": {
            "consumer": 65,
            "common": 21,
            "rare": 10,
            "epic": 2,
            "legendary": 0.8,
            "mythical": 0.2
        },
        "items": [
            {
                "name": "50.000 Вирт",
                "price": 5,
                "img": "img/money.png",
                "rarity": "consumer"
            },
            {
                "name": "100.000 Вирт",
                "price": 10,
                "img": "img/money.png",
                "rarity": "consumer"
            },
            {
                "name": "200.000 Вирт",
                "price": 20,
                "img": "img/money.png",
                "rarity": "common"
            },
            {
                "name": "300.000 Вирт",
                "price": 30,
                "img": "img/money.png",
                "rarity": "common"
            },
            {
                "name": "500.000 Вирт",
                "price": 50,
                "img": "img/money.png",
                "rarity": "rare"
            },
            {
                "name": "1.000.000 Вирт",
                "price": 100,
                "img": "img/money.png",
                "rarity": "rare"
            },
            {
                "name": "1.500.000 Вирт",
                "price": 150,
                "img": "img/money.png",
                "rarity": "epic"
            },
            {
                "name": "3.000.000 Вирт",
                "price": 300,
                "img": "img/money.png",
                "rarity": "epic"
            },
            {
                "name": "5.000.000 Вирт",
                "price": 500,
                "img": "img/money.png",
                "rarity": "legendary"
            },
            {
                "name": "10.000.000 Вирт",
                "price": 1000,
                "img": "img/money.png",
                "rarity": "legendary"
            },
            {
                "name": "25.000.000 Вирт",
                "price": 2500,
                "img": "img/money.png",
                "rarity": "mythical"
            },
            {
                "name": "50.000.000 Вирт",
                "price": 5000,
                "img": "img/money.png",
                "rarity": "mythical"
            }
        ]
    },
    {
        "id": 1770628973097,
        "name": "BC Кейс",
        "price": 29,
        "category": "bundles",
        "img": "img/bc_case.png",
        "chances": {
            "consumer": 60,
            "common": 21,
            "rare": 15,
            "epic": 2,
            "legendary": 0.8,
            "mythical": 0.2
        },
        "items": [
            {
                "name": "5 BC",
                "price": 5,
                "img": "img/bc.png",
                "rarity": "consumer"
            },
            {
                "name": "10 BC",
                "price": 10,
                "img": "img/bc.png",
                "rarity": "consumer"
            },
            {
                "name": "20 BC",
                "price": 20,
                "img": "img/bc.png",
                "rarity": "common"
            },
            {
                "name": "30 BC",
                "price": 30,
                "img": "img/bc.png",
                "rarity": "common"
            },
            {
                "name": "50 BC",
                "price": 50,
                "img": "img/bc.png",
                "rarity": "rare"
            },
            {
                "name": "100 BC",
                "price": 100,
                "img": "img/bc.png",
                "rarity": "rare"
            },
            {
                "name": "150 BC",
                "price": 150,
                "img": "img/bc.png",
                "rarity": "epic"
            },
            {
                "name": "300 BC",
                "price": 300,
                "img": "img/bc.png",
                "rarity": "epic"
            },
            {
                "name": "500 BC",
                "price": 500,
                "img": "img/bc.png",
                "rarity": "legendary"
            },
            {
                "name": "1000 BC",
                "price": 1000,
                "img": "img/bc.png",
                "rarity": "legendary"
            },
            {
                "name": "2500 BC",
                "price": 2500,
                "img": "img/bc.png",
                "rarity": "mythical"
            },
            {
                "name": "5000 BC",
                "price": 5000,
                "img": "https://i.imgur.com/T1peEpa_d.png?maxwidth=520&shape=thumb&fidelity=high",
                "rarity": "mythical"
            }
        ]
    },
    {
        "id": 1770631358795,
        "name": "Всё или Ничего (5%)",
        "price": 39,
        "category": "risk",
        "img": "img/allorno5_case.png",
        "chances": {
            "consumer": 0,
            "common": 99.8,
            "rare": 0,
            "epic": 0,
            "legendary": 0.2,
            "mythical": 0
        },
        "items": [
            {
                "name": "Рюкзак «Мопс»",
                "price": 19,
                "img": "img/mops.png",
                "rarity": "common"
            },
            {
                "name": "Mercedes AMG GT-R",
                "price": 1999,
                "img": "img/gtr.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770662160253,
        "name": "Кейс с аксессуарами ",
        "price": 89,
        "category": "bundles",
        "img": "img/accesories_case.png",
        "chances": {
            "consumer": 65,
            "common": 26,
            "rare": 6,
            "epic": 3,
            "legendary": 1,
            "mythical": 0
        },
        "items": [
            {
                "name": "Кейс Серый",
                "price": 250,
                "img": "img/graycase.png",
                "rarity": "epic"
            },
            {
                "name": "Маска Дали",
                "price": 29,
                "img": "img/dali.png",
                "rarity": "consumer"
            },
            {
                "name": "Очки «Street»",
                "price": 19,
                "img": "img/streetglass.png",
                "rarity": "consumer"
            },
            {
                "name": "Корона Короля",
                "price": 99,
                "img": "img/korona.png",
                "rarity": "rare"
            },
            {
                "name": "Рюкзак «Мопс»",
                "price": 79,
                "img": "img/mops.png",
                "rarity": "common"
            },
            {
                "name": "Рюкзак Боксера",
                "price": 1699,
                "img": "img/boxer.png",
                "rarity": "legendary"
            },
            {
                "name": "Водяной Пистолет",
                "price": 1399,
                "img": "img/vodyanoi.png",
                "rarity": "legendary"
            },
            {
                "name": "Голова Коня",
                "price": 399,
                "img": "img/konya.png",
                "rarity": "epic"
            },
            {
                "name": "Маска Ведущего",
                "price": 249,
                "img": "img/squid.png",
                "rarity": "epic"
            },
            {
                "name": "Крылья Демона",
                "price": 149,
                "img": "img/demonfly.png",
                "rarity": "rare"
            },
            {
                "name": "Демонические Рожки",
                "price": 99,
                "img": "img/demon.png",
                "rarity": "common"
            },
            {
                "name": "Маска Чилл",
                "price": 1299,
                "img": "img/chill.png",
                "rarity": "legendary"
            },
            {
                "name": "BR VISUALS MAX",
                "price": 69,
                "img": "img/vr.png",
                "rarity": "common"
            },
            {
                "name": "Новогодний Топорик",
                "price": 249,
                "img": "img/newyearaxe.png",
                "rarity": "epic"
            },
            {
                "name": "Побитые Очки",
                "price": 10,
                "img": "img/brokeglass.png",
                "rarity": "consumer"
            },
            {
                "name": "Шлем MechaCat",
                "price": 49,
                "img": "img/mechacat.png",
                "rarity": "common"
            },
            {
                "name": "Кейс Снеговик",
                "price": 149,
                "img": "img/casesnegovik.png",
                "rarity": "rare"
            },
            {
                "name": "Пакет",
                "price": 49,
                "img": "img/packet.png",
                "rarity": "consumer"
            }
        ]
    },
    {
        "id": 1770663755440,
        "name": "Кейс Скинов",
        "price": 189,
        "category": "bundles",
        "img": "img/skin_case.png",
        "chances": {
            "consumer": 65,
            "common": 19,
            "rare": 11,
            "epic": 4.5,
            "legendary": 0.5,
            "mythical": 0
        },
        "items": [
            {
                "name": "Фирменная одежда",
                "price": 14999,
                "img": "img/admin.png",
                "rarity": "mythical"
            },
            {
                "name": "Скелетон",
                "price": 2999,
                "img": "img/skeleton.png",
                "rarity": "legendary"
            },
            {
                "name": "Известный",
                "price": 2499,
                "img": "img/vlada4.png",
                "rarity": "legendary"
            },
            {
                "name": "Господин",
                "price": 2499,
                "img": "img/putin.png",
                "rarity": "legendary"
            },
            {
                "name": "Известный",
                "price": 2499,
                "img": "img/buster.png",
                "rarity": "legendary"
            },
            {
                "name": "Злой",
                "price": 1799,
                "img": "img/ono.png",
                "rarity": "legendary"
            },
            {
                "name": "Известный",
                "price": 1249,
                "img": "img/ronaldo.png",
                "rarity": "epic"
            },
            {
                "name": "Известный",
                "price": 1249,
                "img": "img/litvin.png",
                "rarity": "epic"
            },
            {
                "name": "Илон Маск",
                "price": 1249,
                "img": "img/elonmusk.png",
                "rarity": "epic"
            },
            {
                "name": "Игрок 456",
                "price": 749,
                "img": "img/456.png",
                "rarity": "epic"
            },
            {
                "name": "Мужчина",
                "price": 2499,
                "img": "img/man.png",
                "rarity": "legendary"
            },
            {
                "name": "Дед Мороз",
                "price": 1249,
                "img": "img/santa.png",
                "rarity": "epic"
            },
            {
                "name": "Иван Блогер",
                "price": 2499,
                "img": "img/zolo.png",
                "rarity": "legendary"
            },
            {
                "name": "Блогер",
                "price": 2499,
                "img": "img/nekoglai.png",
                "rarity": "legendary"
            },
            {
                "name": "Поззи",
                "price": 1249,
                "img": "img/pozzi.png",
                "rarity": "epic"
            },
            {
                "name": "Пчелка",
                "price": 399,
                "img": "img/pchelka.png",
                "rarity": "rare"
            },
            {
                "name": "Женщина",
                "price": 1249,
                "img": "img/woman.png",
                "rarity": "epic"
            },
            {
                "name": "Посейдон",
                "price": 1499,
                "img": "img/poseydon.png",
                "rarity": "legendary"
            },
            {
                "name": "Борик",
                "price": 749,
                "img": "img/borik.png",
                "rarity": "epic"
            },
            {
                "name": "Одежда 29",
                "price": 9,
                "img": "img/29.png",
                "rarity": "consumer"
            },
            {
                "name": "Защитница закона",
                "price": 59,
                "img": "img/zakon.png",
                "rarity": "consumer"
            },
            {
                "name": "Иван Береговой",
                "price": 79,
                "img": "img/beregovoy.png",
                "rarity": "consumer"
            },
            {
                "name": "Королева Манипуляций",
                "price": 149,
                "img": "img/manipulyaciy.png",
                "rarity": "common"
            },
            {
                "name": "Бабушка Серафима",
                "price": 79,
                "img": "img/serafima.png",
                "rarity": "consumer"
            },
            {
                "name": "Бомж",
                "price": 9,
                "img": "img/bomj.png",
                "rarity": "consumer"
            },
            {
                "name": "Емеля",
                "price": 299,
                "img": "img/emelya.png",
                "rarity": "common"
            },
            {
                "name": "Пузатый",
                "price": 19,
                "img": "img/pyzatiy.png",
                "rarity": "consumer"
            },
            {
                "name": "Рыбачка",
                "price": 399,
                "img": "img/ribachka.png",
                "rarity": "common"
            },
            {
                "name": "Хоуми",
                "price": 349,
                "img": "img/homie.png",
                "rarity": "rare"
            },
            {
                "name": "Опасный",
                "price": 399,
                "img": "img/dangerman.png",
                "rarity": "rare"
            }
        ]
    },
    {
        "id": 1770631659139,
        "name": "Всё или Ничего (10%)",
        "price": 49,
        "category": "risk",
        "img": "img/allorno10_case.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 99.75,
            "epic": 0,
            "legendary": 0.25,
            "mythical": 0
        },
        "items": [
            {
                "name": "Маска «Дали»",
                "price": 29,
                "img": "img/dali.png",
                "rarity": "rare"
            },
            {
                "name": "Lamborghini Urus",
                "price": 3999,
                "img": "img/urus.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770829085914,
        "name": "Дубайский Контейнер",
        "price": 2499,
        "category": "container",
        "img": "img/dubai_case.png",
        "chances": {
            "consumer": 0,
            "common": 0,
            "rare": 96,
            "epic": 3,
            "legendary": 0.95,
            "mythical": 0.05
        },
        "items": [
            {
                "name": "Lamborghini Urus",
                "price": 3799,
                "img": "img/urus.png",
                "rarity": "epic"
            },
            {
                "name": "Rolls-Royce Phantom",
                "price": 11999,
                "img": "img/senat.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz G63 AMG",
                "price": 5499,
                "img": "img/g63.png",
                "rarity": "legendary"
            },
            {
                "name": "Lamborghini Aventador S",
                "price": 4999,
                "img": "img/aventador.png",
                "rarity": "epic"
            },
            {
                "name": "GAZ 69",
                "price": 39999,
                "img": "img/gaz69.png",
                "rarity": "mythical"
            },
            {
                "name": "Mercedes-Benz GT63s",
                "price": 1199,
                "img": "img/gt63s.png",
                "rarity": "rare"
            },
            {
                "name": "Chevrolet Camaro ZL1",
                "price": 999,
                "img": "img/camaro.png",
                "rarity": "rare"
            },
            {
                "name": "Kawasaki Ninja H2R",
                "price": 2499,
                "img": "img/supersport.png",
                "rarity": "epic"
            },
            {
                "name": "BMW M4 F84",
                "price": 739,
                "img": "img/m4f84.png",
                "rarity": "rare"
            },
            {
                "name": "Mercedes-Benz AMG GT-R",
                "price": 3299,
                "img": "img/gtr.png",
                "rarity": "epic"
            },
            {
                "name": "Mercedes-Benz G63 6x6",
                "price": 39999,
                "img": "img/g636x6.png",
                "rarity": "mythical"
            },
            {
                "name": "Mercedes-Benz Maybach S650",
                "price": 6199,
                "img": "img/maybach.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770835909177,
        "name": "Германский Контейнер",
        "price": 1199,
        "category": "container",
        "img": "img/gernany_case.png",
        "chances": {
            "consumer": 0,
            "common": 75,
            "rare": 20,
            "epic": 4,
            "legendary": 0.92,
            "mythical": 0.08
        },
        "items": [
            {
                "name": "Mercedes-Benz A45 AMG",
                "price": 699,
                "img": "img/a45amg.png",
                "rarity": "common"
            },
            {
                "name": "Lexus RCF",
                "price": 849,
                "img": "img/lexusRCF.png",
                "rarity": "rare"
            },
            {
                "name": "Volvo XC90",
                "price": 1055,
                "img": "img/xc90.png",
                "rarity": "rare"
            },
            {
                "name": "BMW Z4 M40i",
                "price": 1199,
                "img": "img/z4m40i.png",
                "rarity": "rare"
            },
            {
                "name": "BMW M5 F10",
                "price": 1249,
                "img": "img/m5f10.png",
                "rarity": "epic"
            },
            {
                "name": "Cadilac Escalade",
                "price": 1799,
                "img": "img/Cescalade.png",
                "rarity": "epic"
            },
            {
                "name": "Tayota Land Cruiser 200",
                "price": 1999,
                "img": "img/TLcruiser200.png",
                "rarity": "epic"
            },
            {
                "name": "BMW M5 F90",
                "price": 2399,
                "img": "img/m5f90.png",
                "rarity": "legendary"
            },
            {
                "name": "Range Rover SVR",
                "price": 2499,
                "img": "img/rrover.png",
                "rarity": "legendary"
            },
            {
                "name": "Mercedes-Benz CLS63 AMG",
                "price": 2599,
                "img": "img/cls63.png",
                "rarity": "legendary"
            },
            {
                "name": "Infiniti FX50S",
                "price": 899,
                "img": "img/fx50s.png",
                "rarity": "rare"
            },
            {
                "name": "Nissan Rathfinder 2022",
                "price": 1055,
                "img": "img/pathfinder.png",
                "rarity": "rare"
            },
            {
                "name": "Mercedes-Benz AMG GT-R",
                "price": 3299,
                "img": "img/gtr.png",
                "rarity": "legendary"
            }
        ]
    },
    {
        "id": 1770837141135,
        "name": "Российский Контейнер",
        "price": 79,
        "category": "container",
        "img": "img/russia_case.png",
        "chances": {
            "consumer": 64,
            "common": 26,
            "rare": 7,
            "epic": 2.8,
            "legendary": 0.2,
            "mythical": 0.08
        },
        "items": [
            {
                "name": "GAZ Volga",
                "price": 23,
                "img": "img/volga.png",
                "rarity": "consumer"
            },
            {
                "name": "VAZ 2106",
                "price": 24,
                "img": "img/2106.png",
                "rarity": "consumer"
            },
            {
                "name": "VAZ 2107",
                "price": 39,
                "img": "img/2107.png",
                "rarity": "consumer"
            },
            {
                "name": "VAZ 2112",
                "price": 52,
                "img": "img/2112.png",
                "rarity": "common"
            },
            {
                "name": "VAZ 2115",
                "price": 55,
                "img": "img/2115.png",
                "rarity": "common"
            },
            {
                "name": "VAZ 2170",
                "price": 75,
                "img": "img/priora.png",
                "rarity": "common"
            },
            {
                "name": "Niva Urban",
                "price": 90,
                "img": "img/niva.png",
                "rarity": "rare"
            },
            {
                "name": "UAZ Hunter",
                "price": 90,
                "img": "img/UAZ.png",
                "rarity": "rare"
            },
            {
                "name": "ЛуАЗ 969",
                "price": 144,
                "img": "img/LuAZ.png",
                "rarity": "epic"
            },
            {
                "name": "Lada Vesta",
                "price": 174,
                "img": "img/vesta.png",
                "rarity": "epic"
            },
            {
                "name": "Lada Vesta SW",
                "price": 174,
                "img": "img/Vesta SW.png",
                "rarity": "epic"
            },
            {
                "name": "Mercedes-Benz A45 AMG",
                "price": 399,
                "img": "img/a45amg.png",
                "rarity": "legendary"
            },
            {
                "name": "BMW X5",
                "price": 432,
                "img": "img/x5.png",
                "rarity": "legendary"
            },
            {
                "name": "BMW M5 E60",
                "price": 499,
                "img": "img/m5e60.png",
                "rarity": "legendary"
            },
            {
                "name": "UAZ Patriot",
                "price": 299,
                "img": "img/patriot.png",
                "rarity": "epic"
            }
        ]
    },
    {
        "id": 1770840962126,
        "name": "Яхта Контейнер",
        "price": 599,
        "category": "container",
        "img": "img/yacht_case.png",
        "chances": {
            "consumer": 75,
            "common": 15,
            "rare": 4,
            "epic": 0.35,
            "legendary": 0,
            "mythical": 0
        },
        "items": [
            {
                "name": "Гидроцикл",
                "price": 149,
                "img": "img/hydrocycle.png",
                "rarity": "consumer"
            },
            {
                "name": "Ocean Yacht",
                "price": 19999,
                "img": "img/oceanyacht.png",
                "rarity": "mythical"
            },
            {
                "name": "Моторная лодка",
                "price": 599,
                "img": "img/motornaya.png",
                "rarity": "common"
            },
            {
                "name": "Speedy Yacht",
                "price": 999,
                "img": "img/speedy.png",
                "rarity": "rare"
            },
            {
                "name": "Marine Yach",
                "price": 3749,
                "img": "img/Marine.png",
                "rarity": "epic"
            },
            {
                "name": "Sea Yacht",
                "price": 9999,
                "img": "img/sea.png",
                "rarity": "legendary"
            }
        ]
    }
];

        const DEFAULT_PROMO_CODES = [
            { "code": "ADMINKAADMINKAADMINKA", "val": 1000, "limit": 0 },
            { "code": "BRCASES", "val": 50, "limit": 1 },
            { "code": "KOLBASENKO", "val": 15, "limit": 1 },
            { "code": "VIBE", "val": 10, "limit": 1 },
            { "code": "BAN", "val": 5, "limit": 1 },
            { "code": "FREE", "val": 20, "limit": 1 },
            { "code": "BLACK", "val": 12, "limit": 1 },
            { "code": "14FEB", "val": 14, "limit": 1 },
            { "code": "YOUTUBE", "val": 9, "limit": 1 },
            { "code": "TIKTOK", "val": 9, "limit": 1 }
        ];

const DEFAULT_USER = { 
    balance: 0, inventory: [], uid: 0, name: "Гость", tgUsername: "", gameNick: "", 
    gameServer: "Red", bankAccount: "", avatar: "", history: [], activatedPromos: [],
    lastSubCaseTime: 0, isSubscribed: false 
};
let user = { ...DEFAULT_USER };

let paymentCheckInterval = null, selectedCase = null, currentWins = [], selectedOpenCount = 1; 
let selectedInventoryIndex = null, upgradeState = { sourceIdx: null, targetItem: null, chance: 50 };
let ALL_ITEMS_POOL = [], contractSelection = [];

/* ==============================================
   INIT
   ============================================== */
document.addEventListener('DOMContentLoaded', () => {
    try { if(tg) tg.expand(); } catch(e) {}
    
    loadExternalConfig();
    createNotificationArea(); 
    createContractAnimDOM(); 
    createContainerAnimDOM(); 
    initCases(); 
    flattenItems(); 
    
    // Запуск инициализации пользователя
    initUserSessionSupabase();
});

// --- SUPABASE SYNC LOGIC ---

async function initUserSessionSupabase() {
    console.log("Connecting to Supabase...");
    
    // 1. Получаем данные от TG
    let uid = 0, first_name = "User", username = "", photo_url = "";
    
    // Безопасное получение ID (для тестов 123456, для TG реальный ID)
    if (tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.id !== 0) { 
        uid = tg.initDataUnsafe.user.id; 
        first_name = tg.initDataUnsafe.user.first_name || "User";
        username = tg.initDataUnsafe.user.username ? `@${tg.initDataUnsafe.user.username}` : "";
        photo_url = tg.initDataUnsafe.user.photo_url || "";
    } else {
        uid = 123456; // Тестовый ID для браузера
        first_name = "BrowserTester";
    }

    try {
        // 2. Запрос в БД (используем sb вместо supabase)
        const { data, error } = await sb
            .from('users')
            .select('*')
            .eq('telegram_id', uid)
            .maybeSingle(); 

        if (error) {
            console.error("Supabase Error:", error);
            // Если ошибка БД, показываем дефолтного юзера, чтобы не висела загрузка
            document.getElementById('loading-screen').style.display = 'none';
            user.uid = uid;
            user.name = first_name;
            updateUI();
            showNotify("Ошибка связи с базой данных", "error");
            return;
        }

        if (data) {
            // Пользователь найден
            console.log("User found:", data);
            user = {
                uid: data.telegram_id,
                name: first_name, 
                tgUsername: username,
                balance: Number(data.balance),
                inventory: data.inventory || [],
                history: data.history || [],
                gameNick: data.game_nick || "",
                gameServer: data.game_server || "Red",
                bankAccount: data.bank_account || "",
                activatedPromos: data.activated_promos || [],
                isSubscribed: data.is_subscribed || false,
                lastSubCaseTime: data.last_sub_case_time || 0,
                avatar: photo_url
            };
            // Обновляем имя/ник в фоне
            sb.from('users').update({ username: username, first_name: first_name }).eq('telegram_id', uid).then();

        } else {
            // Пользователь НЕ найден -> Создаем
            console.log("Creating new user...");
            const newUser = { 
                telegram_id: uid, 
                username: username, 
                first_name: first_name,
                balance: 0,
                inventory: [],
                history: []
            };

            const { error: insertError } = await sb
                .from('users')
                .insert([newUser]);
            
            if(insertError) {
                console.error("Create User Error:", insertError);
                showNotify("Не удалось создать профиль", "error");
            }
            
            user = { ...DEFAULT_USER, ...newUser, uid: uid, avatar: photo_url };
        }
    } catch (err) {
        console.error("Critical Error:", err);
    }

    // 3. Убираем загрузочный экран ВСЕГДА
    document.getElementById('loading-screen').style.display = 'none';
    updateUI(); 
    renderInventory(); 
    renderHistory();
}

async function saveUser() {
    // Используем sb
    const { error } = await sb
        .from('users')
        .update({
            balance: user.balance,
            inventory: user.inventory,
            history: user.history,
            game_nick: user.gameNick,
            game_server: user.gameServer,
            bank_account: user.bankAccount,
            activated_promos: user.activatedPromos,
            is_subscribed: user.isSubscribed,
            last_sub_case_time: user.lastSubCaseTime
        })
        .eq('telegram_id', user.uid);

    if(error) console.error("Save Error:", error);
}

// --- ДАЛЕЕ ИДЕТ ВЕСЬ ОСТАЛЬНОЙ КОД (БЕЗ ИЗМЕНЕНИЙ, КРОМЕ ОДНОГО МЕСТА) ---
// В функции initYooPayment нужно поменять вызов supabase на sb

async function initYooPayment(sum) { 
    if(!sum || sum < 10) return showNotify("Минимальная сумма 10₽", "error"); 
    const label = `order_${user.uid}_${Date.now()}`; 
    // ЗАМЕНИТЕ ВАШ КОШЕЛЕК ЮMANEY ЗДЕСЬ, ЕСЛИ НУЖНО
    const url = `https://yoomoney.ru/quickpay/confirm?receiver=4100117889685528&quickpay-form=shop&targets=Deposit&paymentType=AC&sum=${sum}&label=${label}`; 
    if(tg.openLink) tg.openLink(url); else window.open(url, '_blank'); 
    
    const statusBox = document.getElementById('payment-status-box'); 
    statusBox.style.display = 'flex'; 
    statusBox.querySelector('.p-title').innerText = `Ожидание ${sum} ₽`; 
    statusBox.querySelector('.p-desc').innerText = "Проверка транзакции..."; 

    if(paymentCheckInterval) clearInterval(paymentCheckInterval); 
    let checks = 0; const startBalance = user.balance;
    
    paymentCheckInterval = setInterval(async () => { 
        checks++; 
        if(checks > 60) { clearInterval(paymentCheckInterval); statusBox.querySelector('.p-title').innerText = "Время истекло"; return; } 
        
        // Используем sb
        const { data } = await sb.from('users').select('balance').eq('telegram_id', user.uid).maybeSingle();
        
        if (data && data.balance > startBalance) {
             const diff = data.balance - startBalance; clearInterval(paymentCheckInterval);
             user.balance = data.balance; addHistory('Пополнение', `+${diff}`);
             updateUI(); statusBox.querySelector('.p-title').innerText = "Успешно!"; 
             setTimeout(() => { statusBox.style.display = 'none'; }, 3000); 
        }
    }, 5000); 
}

// --- ОСТАЛЬНЫЕ ФУНКЦИИ UI (БЕЗ ИЗМЕНЕНИЙ) ---

function createNotificationArea() { if(!document.getElementById('notify-area')) { const div = document.createElement('div'); div.id = 'notify-area'; document.body.appendChild(div); } }
function createContractAnimDOM() { if(!document.querySelector('.contract-anim-overlay')) { const div = document.createElement('div'); div.className = 'contract-anim-overlay'; div.id = 'contract-anim-overlay'; div.innerHTML = `<div class="contract-vortex" id="contract-vortex"></div><div class="contract-flash" id="contract-flash"></div>`; document.body.appendChild(div); } }
function createContainerAnimDOM() { if(!document.querySelector('.container-anim-overlay')) { const div = document.createElement('div'); div.className = 'container-anim-overlay'; div.id = 'container-anim-overlay'; div.innerHTML = ` <div class="container-box" id="container-box"> <div class="container-lock"></div> <div class="container-door c-door-left"></div> <div class="container-door c-door-right"></div> <div class="container-inner-light"></div> <img id="container-reveal-img" class="container-item-reveal" src="" /> </div> `; document.body.appendChild(div); } }

function loadExternalConfig() {
    const adminCases = localStorage.getItem('admin_game_config_v7');
    const adminPromos = localStorage.getItem('admin_promo_config_v3');
    if(adminCases) { try { GAME_CONFIG = JSON.parse(adminCases); } catch(e){} }
    if(adminPromos) { try { PROMO_CODES = JSON.parse(adminPromos); } catch(e){} }
    // Если конфига нет, используем пустой массив, чтобы не было ошибки forEach
    if(!GAME_CONFIG) GAME_CONFIG = [];
}

async function sendTelegramLog(topicId, text) {
    if (API_URL.includes("ВСТАВЬТЕ")) return; 
    try { 
        await fetch(`${API_URL}?action=log&topic=${topicId}&text=${encodeURIComponent(text)}`, { method: 'GET', mode: 'no-cors' }); 
    } catch (e) { console.error("Log error", e); }
}

function showNotify(msg, type = 'info') {
    const area = document.getElementById('notify-area');
    const toast = document.createElement('div'); toast.className = `notify-toast ${type}`;
    let icon = 'ℹ️'; if(type === 'success') icon = '✅'; if(type === 'error') icon = '⛔️';
    toast.innerHTML = `<div class="notify-icon">${icon}</div><div class="notify-msg">${msg}</div>`;
    area.appendChild(toast);
    safeHaptic(type === 'error' ? 'error' : 'success');
    setTimeout(() => { toast.classList.add('hiding'); setTimeout(() => toast.remove(), 400); }, 3000);
}

function safeHaptic(type) { try { if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred(type); } catch (e) {} }

function addHistory(text, val) { const color = val.includes('+') ? '#4CAF50' : '#ff4d4d'; user.history.unshift({ text, val, color }); if(user.history.length > 30) user.history.pop(); renderHistory(); }

function updateUI() { 
    document.getElementById('user-balance').innerText = Math.floor(user.balance).toLocaleString(); 
    document.getElementById('header-name').innerText = user.gameNick || user.name; 
    document.getElementById('header-uid').innerText = user.uid; 
    if (user.avatar) document.getElementById('header-avatar').src = user.avatar; 
    document.getElementById('profile-bal').innerText = Math.floor(user.balance).toLocaleString() + " ₽"; 
    document.getElementById('profile-uid').innerText = user.uid; 
}

function initCases() { 
    const cats = { 'free': 'cases-free', 'default': 'cases-default', 'bundles': 'cases-bundles', 'risk': 'cases-risk', 'container': 'containers' }; 
    for (let c in cats) { const el = document.getElementById(cats[c]); if(el) el.innerHTML = ''; } 
    if (!GAME_CONFIG || GAME_CONFIG.length === 0) return;
    GAME_CONFIG.forEach(c => { 
        let targetId = cats[c.category] || 'cases-default';
        const div = document.getElementById(targetId); 
        if (div) div.innerHTML += `<div class="case-card rarity-common" onclick="openPreview('${c.id}')"><img src="${c.img}" class="case-img" onerror="this.src='${PLACEHOLDER_IMG}'"><div>${c.name}</div><div>${c.price} ₽</div></div>`; 
    }); 
}

async function checkGlobalSubscription() {
    if (user.isSubscribed) return true;
    try {
        const res = await fetch(`${API_URL}?action=check_sub&uid=${user.uid}`);
        const data = await res.json();
        if (data.status === true) {
            user.isSubscribed = true; saveUser(); return true;
        }
        return false;
    } catch (e) { return false; }
}

let countdownInterval = null;
async function openPreview(id) { 
    selectedCase = GAME_CONFIG.find(c => c.id == id); if (!selectedCase) return;
    const btnOpen = document.getElementById('btn-open-case');
    const timerDiv = document.getElementById('sub-timer');
    const subBtn = document.getElementById('btn-sub-check');
    const qtySel = document.getElementById('qty-selector');
    let verifyBtn = document.getElementById('btn-sub-verify');
    if(verifyBtn) { verifyBtn.style.display = 'none'; verifyBtn.disabled = false; verifyBtn.innerText = 'ПРОВЕРИТЬ ПОДПИСКУ'; }
    btnOpen.style.display = 'block'; btnOpen.innerHTML = `ОТКРЫТЬ ЗА <span id="btn-total-price">${selectedCase.price}</span> ₽`; btnOpen.disabled = false;
    subBtn.style.display = 'none'; timerDiv.style.display = 'none'; qtySel.style.display = 'flex';
    if(countdownInterval) clearInterval(countdownInterval);
    setOpenCount(1);
    document.getElementById('preview-img').src = selectedCase.img; 
    document.getElementById('preview-title').innerText = selectedCase.name; 
    document.getElementById('preview-price').innerText = selectedCase.price + " ₽"; 

    if(selectedCase.category === 'free') {
        qtySel.style.display = 'none'; 
        const COOLDOWN = 48 * 60 * 60 * 1000; 
        const now = Date.now();
        const diff = now - (user.lastSubCaseTime || 0);
        if(user.lastSubCaseTime > 0 && diff < COOLDOWN) {
            btnOpen.style.display = 'none'; timerDiv.style.display = 'block';
            updateTimer(COOLDOWN - diff);
            countdownInterval = setInterval(() => {
                const newDiff = Date.now() - (user.lastSubCaseTime || 0);
                if(newDiff >= COOLDOWN) { clearInterval(countdownInterval); openPreview(id); } else updateTimer(COOLDOWN - newDiff);
            }, 1000);
        } else {
            if (!user.isSubscribed) { btnOpen.style.display = 'none'; subBtn.style.display = 'block'; subBtn.innerText = "ПОДПИСАТЬСЯ"; } 
            else { btnOpen.innerText = "ОТКРЫТЬ БЕСПЛАТНО"; }
        }
    }
    const cont = document.getElementById('preview-items-container'); cont.innerHTML = ''; 
    let sorted = [...selectedCase.items].sort((a,b) => b.price - a.price); 
    sorted.forEach(item => { cont.innerHTML += `<div class="preview-item rarity-${item.rarity}"><img src="${item.img}" onerror="this.src='${PLACEHOLDER_IMG}'"><div class="p-name">${item.name}</div><div class="p-price">${item.price} ₽</div></div>`; }); 
    document.getElementById('modal-preview').style.display = 'flex'; 
}

function updateTimer(ms) { const totalSec = Math.floor(ms / 1000); const h = Math.floor(totalSec / 3600); const m = Math.floor((totalSec % 3600) / 60); const s = totalSec % 60; document.getElementById('sub-timer').innerText = `Доступно через: ${h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`; }
function checkSubscriptionAction() { if(tg.openTelegramLink) tg.openTelegramLink(SUB_CHANNEL_URL); else window.open(SUB_CHANNEL_URL, '_blank'); document.getElementById('btn-sub-check').style.display = 'none'; const vBtn = document.getElementById('btn-sub-verify'); if(vBtn) vBtn.style.display = 'block'; }
async function verifySubscriptionWithBackend() { const vBtn = document.getElementById('btn-sub-verify'); vBtn.disabled = true; vBtn.innerText = "ПРОСИМ API..."; const isSub = await checkGlobalSubscription(); if (isSub) { showNotify("Подписка подтверждена!", "success"); openPreview(selectedCase.id); } else { showNotify("Канал не найден или вы не подписаны", "error"); vBtn.disabled = false; vBtn.innerText = "ПРОВЕРИТЬ ЕЩЕ РАЗ"; } }
function setOpenCount(n) { selectedOpenCount = n; document.querySelectorAll('.qty-btn').forEach(b => { b.classList.remove('active'); if (b.innerText === `x${n}`) b.classList.add('active'); }); const priceSpan = document.getElementById('btn-total-price'); if (priceSpan && selectedCase) priceSpan.innerText = (selectedCase.price * n).toLocaleString(); }

async function startRouletteSequence() {
    if(selectedCase.category === 'free') { const isRealSub = await checkGlobalSubscription(); if(!isRealSub) return showNotify("Вы не подписаны!", "error"); }
    const cost = selectedCase.price * selectedOpenCount;
    if(user.balance < cost) return showNotify("Недостаточно средств!", "error");
    if(cost > 0) { user.balance -= cost; addHistory(`Открытие ${selectedCase.name} x${selectedOpenCount}`, `-${cost}`); } 
    else { addHistory(`Открытие ${selectedCase.name}`, `Бесплатно`); user.lastSubCaseTime = Date.now(); }
    saveUser(); updateUI(); closeModal('modal-preview');
    currentWins = []; for(let i=0; i<selectedOpenCount; i++) currentWins.push(getWinItem(selectedCase));
    if(document.getElementById('fast-open-check').checked) { showWin(currentWins); } 
    else { if (selectedCase.category === 'container') { playContainerAnim(currentWins[0]); } else { playRouletteAnim(selectedOpenCount, currentWins); } }
}

function getWinItem(c) { const weights = c.chances || { consumer: 50, common: 30, rare: 15, epic: 4, legendary: 1, mythical: 0 }; const rand = Math.random() * 100; let sum = 0; let rar = 'consumer'; for(let r in weights) { sum += weights[r]; if(rand <= sum) { rar = r; break; } } const pool = c.items.filter(i => i.rarity === rar); if (pool.length === 0) return c.items[0]; return pool[Math.floor(Math.random()*pool.length)]; }
function playContainerAnim(winItem) { const overlay = document.getElementById('container-anim-overlay'); const box = document.getElementById('container-box'); const img = document.getElementById('container-reveal-img'); overlay.style.display = 'flex'; box.classList.remove('open'); img.src = winItem.img; safeHaptic('impact'); setTimeout(() => { box.classList.add('open'); safeHaptic('selection'); setTimeout(() => { safeHaptic('success'); setTimeout(() => { overlay.style.display = 'none'; showWin(currentWins); }, 1500); }, 1200); }, 800); }
function playRouletteAnim(count, wins) { const modal = document.getElementById('modal-roulette'); const container = document.getElementById('roulette-strips-container'); container.innerHTML = ''; modal.style.display = 'flex'; setTimeout(() => modal.classList.add('active'), 10); const isMulti = count > 1; if(isMulti) container.classList.add('grid-mode'); else container.classList.remove('grid-mode'); let ITEM_WIDTH = isMulti ? 76 : 120; const WIN_INDEX = 40; const TOTAL_CARDS = 60; for(let i=0; i<count; i++) { const winItem = wins[i]; const strip = document.createElement('div'); strip.className = 'modern-roulette-track'; const marker = document.createElement('div'); marker.className = 'center-marker'; strip.appendChild(marker); const rail = document.createElement('div'); rail.className = 'modern-rail'; rail.style.paddingLeft = '50%'; rail.style.marginLeft = `-${ITEM_WIDTH / 2}px`; let trackHTML = ''; for(let j=0; j<TOTAL_CARDS; j++) { let randItem = selectedCase.items[Math.floor(Math.random()*selectedCase.items.length)]; if(j === WIN_INDEX) randItem = winItem; trackHTML += `<div class="m-card rarity-${randItem.rarity}"><img src="${randItem.img}" onerror="this.src='${PLACEHOLDER_IMG}'"><div class="m-card-info"><div class="m-name">${randItem.name}</div><div class="m-price">${randItem.price} ₽</div></div></div>`; } rail.innerHTML = trackHTML; strip.appendChild(rail); container.appendChild(strip); setTimeout(() => { const randOffset = Math.floor(Math.random() * (ITEM_WIDTH * 0.4)) - (ITEM_WIDTH * 0.2); const distance = (WIN_INDEX * ITEM_WIDTH) + randOffset; const duration = isMulti ? (4 + Math.random()) : 4.5; rail.style.transition = `transform ${duration}s cubic-bezier(0.15, 0.85, 0.35, 1)`; rail.style.transform = `translateX(-${distance}px)`; }, 100); } safeHaptic('impact'); setTimeout(() => { showWin(wins); }, 5000); }

function showWin(items) { const modal = document.getElementById('modal-roulette'); modal.classList.remove('active'); setTimeout(() => { modal.style.display = 'none'; }, 400); const grid = document.getElementById('win-grid'); grid.innerHTML = ''; if(items.length === 1) grid.classList.add('single-item'); else grid.classList.remove('single-item'); let sum = 0; let bestRarityVal = 0; let bestRarityName = 'consumer'; items.forEach(i => { sum += i.price; const val = RARITY_VALS[i.rarity] || 1; if(val > bestRarityVal) { bestRarityVal = val; bestRarityName = i.rarity; } const color = RARITY_COLORS[i.rarity] || '#ccc'; grid.innerHTML += `<div class="win-item rarity-${i.rarity}" style="border-bottom: 3px solid ${color}"><img src="${i.img}"><div style="font-size:10px; margin-top:5px; color:#fff">${i.name}</div><div style="font-size:9px; color:${color}; font-weight:bold">${i.price} ₽</div></div>`; }); const winContent = document.getElementById('win-modal-content'); winContent.className = 'modal-glass center-modal win-modal ' + bestRarityName; document.getElementById('win-total-price').innerText = sum; document.getElementById('modal-win').style.display = 'flex'; safeHaptic('success'); }
function getLogHeader() { return `👤 <b>Игрок:</b> ${user.name}\n🆔 <b>ID:</b> <code>${user.uid}</code>\n🔖 <b>TG:</b> ${user.tgUsername}\n💰 <b>Баланс:</b> ${Math.floor(user.balance)}₽`; }
function finishWin(keep) { let logMsg = `🎰 <b>УСПЕШНОЕ ОТКРЫТИЕ</b>\n➖➖➖➖➖➖➖\n${getLogHeader()}\n📦 <b>Кейс:</b> ${(selectedCase && selectedCase.name) || 'Unknown'}\n\n<b>ВЫПАЛО:</b>\n`; currentWins.forEach(i => logMsg += `▫️ ${i.name} (${i.price}₽)\n`); if(keep) { currentWins.forEach(i => user.inventory.push(i)); addHistory(`Дроп: ${currentWins.length} предм.`, "В гараж"); logMsg += `\n⚙️ <b>Действие:</b> В гараж`; } else { let sum = currentWins.reduce((a,b)=>a+b.price, 0); user.balance += sum; addHistory(`Продажа дропа`, `+${sum}`); logMsg += `\n⚙️ <b>Действие:</b> Продажа (+${sum}₽)`; } saveUser(); sendTelegramLog(TOPICS.LOGS, logMsg); updateUI(); renderInventory(); closeModal('modal-win'); }
function flattenItems() { ALL_ITEMS_POOL = []; const seen = new Set(); if(!GAME_CONFIG) return; GAME_CONFIG.forEach(c => { c.items.forEach(i => { const key = i.name + i.price; if(!seen.has(key)) { seen.add(key); ALL_ITEMS_POOL.push(i); } }); }); ALL_ITEMS_POOL.sort((a,b) => a.price - b.price); }

function renderContractGrid() { const grid = document.getElementById('contract-grid'); grid.innerHTML = ''; if(user.inventory.length === 0) { document.getElementById('contract-empty').style.display = 'block'; return; } document.getElementById('contract-empty').style.display = 'none'; user.inventory.forEach((i, idx) => { const isSelected = contractSelection.includes(idx); grid.innerHTML += `<div class="case-card rarity-${i.rarity} ${isSelected ? 'contract-selected' : ''}" onclick="toggleContractItem(${idx})" style="padding:10px; position:relative;">${isSelected ? '<div style="position:absolute; top:5px; right:5px; color:#4CAF50; font-weight:bold;">✔</div>' : ''}<img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`; }); updateContractStats(); }
function toggleContractItem(idx) { if(contractSelection.includes(idx)) contractSelection = contractSelection.filter(id => id !== idx); else { if(contractSelection.length >= 10) return showNotify("Максимум 10 предметов", "error"); contractSelection.push(idx); } renderContractGrid(); }
function updateContractStats() { let sum = 0; contractSelection.forEach(idx => { if(user.inventory[idx]) sum += user.inventory[idx].price; }); document.getElementById('contract-count').innerText = contractSelection.length; document.getElementById('contract-sum').innerText = sum; document.getElementById('btn-sign-contract').disabled = (contractSelection.length < 5); }
function signContract() { if(contractSelection.length < 5) return showNotify("Минимум 5 предметов", "error"); let inputSum = 0; let inputNames = []; contractSelection.forEach(idx => { inputSum += user.inventory[idx].price; inputNames.push(user.inventory[idx].name); }); const isWin = Math.random() > 0.05; let multiplier = isWin ? (1.1 + (Math.random() * 1.9)) : (0.3 + (Math.random() * 0.6)); const targetPrice = Math.floor(inputSum * multiplier); let bestItem = ALL_ITEMS_POOL[0]; let minDiff = Infinity; ALL_ITEMS_POOL.forEach(item => { const diff = Math.abs(item.price - targetPrice); if(diff < minDiff) { minDiff = diff; bestItem = item; } }); playContractAnimation(contractSelection, bestItem, () => { contractSelection.sort((a,b) => b-a); contractSelection.forEach(idx => user.inventory.splice(idx, 1)); contractSelection = []; currentWins = [bestItem]; selectedCase = { name: "Контракт" }; showWin(currentWins); const logText = `📜 <b>КОНТРАКТ</b>\n${getLogHeader()}\n📥 Вложил: ${inputSum}₽ (${inputNames.length} шт)\n📤 Получил: ${bestItem.name} (${bestItem.price}₽)\n📊 Multiplier: x${multiplier.toFixed(2)}`; sendTelegramLog(TOPICS.LOGS, logText); switchTab('contract'); renderContractGrid(); }); }
function playContractAnimation(indices, winItem, callback) { const overlay = document.getElementById('contract-anim-overlay'); const vortex = document.getElementById('contract-vortex'); vortex.innerHTML = ''; overlay.style.display = 'flex'; indices.forEach((invIdx, i) => { const item = user.inventory[invIdx]; const div = document.createElement('div'); div.className = 'c-anim-item'; div.style.backgroundImage = `url(${item.img})`; div.style.animationDelay = `${i * 0.15}s`; vortex.appendChild(div); }); safeHaptic('impact'); setTimeout(() => { safeHaptic('success'); setTimeout(() => { overlay.style.display = 'none'; callback(); }, 2200); }, 0); }

function renderInventory() { const grid = document.getElementById('inventory-grid'); grid.innerHTML = ''; if(user.inventory.length === 0) { document.getElementById('empty-inventory').style.display = 'block'; document.getElementById('btn-sell-all').style.display = 'none'; } else { document.getElementById('empty-inventory').style.display = 'none'; document.getElementById('btn-sell-all').style.display = 'block'; user.inventory.forEach((i, idx) => { grid.innerHTML += `<div class="case-card rarity-${i.rarity}" onclick="openInvItem(${idx})" style="padding:10px;"><img src="${i.img}" style="width:100%; height:60px; object-fit:contain;" onerror="this.src='${PLACEHOLDER_IMG}'"><div style="font-size:10px; margin-top:5px;">${i.name}</div><div style="font-size:10px; color:#888;">${i.price} ₽</div></div>`; }); } }
function openInvItem(idx) { selectedInventoryIndex = idx; const i = user.inventory[idx]; document.getElementById('inv-item-img').src = i.img; document.getElementById('inv-item-name').innerText = i.name; document.getElementById('inv-item-price').innerText = i.price; document.getElementById('inv-item-virt-price').innerText = getVirtPrice(i.price); document.getElementById('sell-btn-price').innerText = i.price; const badge = document.getElementById('inv-rarity-badge'); badge.innerText = i.rarity; const color = RARITY_COLORS[i.rarity] || '#888'; document.getElementById('inv-bg-glow').style.background = `radial-gradient(circle at center, ${color}, transparent 70%)`; badge.style.borderColor = color; badge.style.color = color; badge.style.boxShadow = `0 0 10px ${color}33`; document.getElementById('modal-inventory-action').style.display = 'flex'; }
function sellCurrentItem() { const i = user.inventory[selectedInventoryIndex]; user.balance += i.price; user.inventory.splice(selectedInventoryIndex, 1); addHistory(`Продажа: ${i.name}`, `+${i.price}`); sendTelegramLog(TOPICS.LOGS, `💸 <b>ПРОДАЖА</b>\n${getLogHeader()}\n📦 ${i.name}\n💰 ${i.price}₽`); saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); showNotify(`Продано за ${i.price}₽`, 'success'); }
function sellAllItems() { if(!confirm("Продать всё?")) return; let sum = user.inventory.reduce((a,b)=>a+b.price, 0); user.balance += sum; user.inventory = []; addHistory(`Продажа всего`, `+${sum}`); sendTelegramLog(TOPICS.LOGS, `💸 <b>ПРОДАЖА ВСЕГО</b>\n${getLogHeader()}\n💰 ${sum}₽`); saveUser(); updateUI(); renderInventory(); showNotify(`Продано на ${sum}₽`, 'success'); }
function withdrawCurrentItem() { if(!user.gameNick || !user.gameServer || !user.bankAccount) { openProfileModal(); showNotify("Заполни профиль!", "error"); return; } const i = user.inventory[selectedInventoryIndex]; if(i.price < 100) return showNotify("Минимальная стоимость вывода: 100 ₽", "error"); user.inventory.splice(selectedInventoryIndex, 1); sendTelegramLog(TOPICS.WITHDRAW, `🏦 <b>ВЫВОД</b>\n${getLogHeader()}\n🎮 <b>GameNick:</b> ${user.gameNick}\n🌍 <b>Server:</b> ${user.gameServer}\n💳 <b>Bank:</b> ${user.bankAccount}\n\n📦 <b>ITEM:</b> ${i.name}\n💵 <b>VIRT:</b> ${getVirtPrice(i.price)}`); saveUser(); updateUI(); renderInventory(); closeModal('modal-inventory-action'); document.getElementById('modal-withdraw-success').style.display = 'flex'; }
function switchTab(id) { document.querySelectorAll('.section').forEach(e=>e.classList.remove('active')); document.getElementById('tab-'+id).classList.add('active'); document.querySelectorAll('.nav-item').forEach(e=>e.classList.remove('active')); event.currentTarget.classList.add('active'); if(id === 'contract') renderContractGrid(); }
function closeModal(id) { document.getElementById(id).style.display = 'none'; if(id === 'modal-preview') { if(countdownInterval) clearInterval(countdownInterval); } }
function saveSettings() { const nick = document.getElementById('setting-nick').value; const srv = document.getElementById('setting-server').value; const bank = document.getElementById('setting-bank').value; if(nick) user.gameNick = nick; if(srv) user.gameServer = srv; if(bank) user.bankAccount = bank; saveUser(); updateUI(); showNotify("Настройки сохранены", "success"); closeModal('modal-profile'); }
function renderHistory() { const hList = document.getElementById('history-list'); if(!hList) return; hList.innerHTML = ''; user.history.forEach(h => { hList.innerHTML += `<div><span>${h.text}</span><span style="color:${h.color}">${h.val}</span></div>`; }); }
function openProfileModal() { document.getElementById('setting-nick').value = user.gameNick; document.getElementById('setting-server').value = user.gameServer; document.getElementById('setting-bank').value = user.bankAccount; renderHistory(); document.getElementById('modal-profile').style.display = 'flex'; }

async function activatePromo() { showNotify("Проверка подписки...", "info"); const isSub = await checkGlobalSubscription(); if(!PROMO_CODES || PROMO_CODES.length === 0) { showNotify("Промокоды не загружены", "error"); return; } if(!isSub) return showNotify("Сначала подпишитесь на канал!", "error"); const codeInput = document.getElementById('promo-input'); const code = codeInput.value.trim(); if(!code) return; const p = PROMO_CODES.find(x => x.code === code); if(p) { if(p.limit && user.activatedPromos.includes(code)) return showNotify("Уже использован", "error"); user.balance = Number(user.balance) + Number(p.val); if(p.limit) user.activatedPromos.push(code); addHistory(`Промо: ${code}`, `+${p.val}`); saveUser(); updateUI(); showNotify(`Промокод активирован: +${p.val} ₽`, 'success'); codeInput.value = ""; } else showNotify("Неверный код", "error"); }
function payCustomAmount() { const val = parseInt(document.getElementById('custom-amount').value); initYooPayment(val); }

function openUpgradeSelector() { const list = document.getElementById('upg-select-grid'); list.innerHTML = ''; if(user.inventory.length === 0) return showNotify("Инвентарь пуст", "error"); user.inventory.forEach((item, idx) => { list.innerHTML += `<div class="upg-item-row rarity-${item.rarity}"><div class="upg-row-left"><img src="${item.img}" class="upg-row-img"><div class="upg-row-info"><div class="upg-row-name">${item.name}</div><div class="upg-row-price">${item.price} ₽</div></div></div><button class="btn-upg-select" onclick="selectUpgradeSource(${idx})">ВЫБРАТЬ</button></div>`; }); document.getElementById('modal-upg-select').style.display = 'flex'; }
function selectUpgradeSource(idx) { upgradeState.sourceIdx = idx; const item = user.inventory[idx]; document.getElementById('upg-source-slot').querySelector('.placeholder-icon').style.display = 'none'; const img = document.getElementById('upg-source-img'); img.src = item.img; img.style.display = 'block'; const pr = document.getElementById('upg-source-price'); pr.innerText = item.price + '₽'; pr.style.display = 'block'; closeModal('modal-upg-select'); updateUpgradeCalculation(); }
function setUpgradeMultiplier(m) { let ch = Math.floor(100/m); if(ch > 75) ch = 75; if(ch < 1) ch = 1; document.getElementById('upg-chance-slider').value = ch; updateUpgradeCalculation(); }
function updateUpgradeCalculation() { if(upgradeState.sourceIdx === null) return; const chance = parseInt(document.getElementById('upg-chance-slider').value); upgradeState.chance = chance; document.getElementById('upg-chance-display').innerText = chance + '%'; document.getElementById('roll-win-zone').style.width = chance + '%'; const srcPrice = user.inventory[upgradeState.sourceIdx].price; const targetPrice = Math.floor(srcPrice * (100/chance)); let best = null; for(let i of ALL_ITEMS_POOL) { if(i.price > srcPrice && i.price <= targetPrice) { if(!best || i.price > best.price) best = i; } } const content = document.getElementById('upg-target-content'); const notFound = document.getElementById('upg-not-found'); const ph = document.getElementById('upg-target-placeholder'); const btn = document.getElementById('btn-do-upgrade'); ph.style.display = 'none'; if(best) { upgradeState.targetItem = best; content.style.display = 'block'; notFound.style.display = 'none'; document.getElementById('upg-target-img').src = best.img; document.getElementById('upg-target-price').innerText = best.price + ' ₽'; btn.disabled = false; } else { upgradeState.targetItem = null; content.style.display = 'none'; notFound.style.display = 'block'; btn.disabled = true; } }
function startUpgrade() { const btn = document.getElementById('btn-do-upgrade'); btn.disabled = true; const pointer = document.getElementById('roll-pointer'); const status = document.getElementById('upg-status-text'); status.innerText = ''; pointer.style.transition = 'none'; pointer.style.left = '0%'; const isWin = (Math.random() * 100) <= upgradeState.chance; let visualRoll; if (isWin) { visualRoll = Math.random() * upgradeState.chance; } else { visualRoll = upgradeState.chance + 0.1 + (Math.random() * (100 - upgradeState.chance - 0.1)); } setTimeout(() => { pointer.style.transition = 'left 0.5s ease-in-out'; pointer.style.left = '95%'; setTimeout(() => { pointer.style.transition = 'left 0.4s ease-in-out'; pointer.style.left = '5%'; setTimeout(() => { pointer.style.transition = 'left 0.6s cubic-bezier(0.1,1,0.3,1)'; pointer.style.left = visualRoll + '%'; setTimeout(() => { if(isWin) { status.innerText = "УСПЕХ"; status.className = "status-text status-win"; processUpgrade(true); safeHaptic('success'); } else { status.innerText = "НЕУДАЧА"; status.className = "status-text status-lose"; processUpgrade(false); safeHaptic('error'); } setTimeout(resetUpgradeUI, 2000); }, 700); }, 400); }, 500); }, 50); }
function processUpgrade(win) { const src = user.inventory[upgradeState.sourceIdx]; const tgt = upgradeState.targetItem; if(win) { user.inventory[upgradeState.sourceIdx] = tgt; addHistory(`Апгрейд: Успех`, `+${tgt.price - src.price}`); sendTelegramLog(TOPICS.LOGS, `⚒ <b>УСПЕШНЫЙ АПГРЕЙД</b>\n${getLogHeader()}\n📉 Был: ${src.name} (${src.price}₽)\n📈 Стал: ${tgt.name} (${tgt.price}₽)\n🎲 Шанс: ${upgradeState.chance}%`); } else { user.inventory.splice(upgradeState.sourceIdx, 1); addHistory(`Апгрейд: Неудача`, `-${src.price}`); sendTelegramLog(TOPICS.LOGS, `🔥 <b>НЕУДАЧНЫЙ АПГРЕЙД</b>\n${getLogHeader()}\n🔥 Сгорело: ${src.name} (${src.price}₽)\n🎲 Шанс: ${upgradeState.chance}%`); } saveUser(); updateUI(); renderInventory(); }
function resetUpgradeUI() { upgradeState.sourceIdx = null; document.getElementById('upg-source-img').style.display = 'none'; document.getElementById('upg-source-price').style.display = 'none'; document.getElementById('upg-source-slot').querySelector('.placeholder-icon').style.display = 'block'; document.getElementById('upg-target-content').style.display = 'none'; document.getElementById('upg-target-placeholder').style.display = 'block'; document.getElementById('upg-not-found').style.display = 'none'; document.getElementById('roll-pointer').style.transition = 'none'; document.getElementById('roll-pointer').style.left = '0%'; document.getElementById('upg-status-text').innerText = ''; document.getElementById('btn-do-upgrade').disabled = true; }
