//Действия при загрузке страницы

let gm_value
const gm_content_table = document.getElementById("gm_content_table")

document.addEventListener("DOMContentLoaded", function () {
  if (classick) {
    gm_value = classick_MW.getAttribute("value")
  } else {
    gm_value = light_MW.getAttribute("value")
  }

  gm_content_table.innerHTML = gm_value
});



//Открытие/закрытие модального окна
const butSettings = document.querySelector(".settings")
const modalWindows = document.querySelector(".modal_window")
const main_0 = document.querySelector(".main_0")
const close_MW = document.querySelector(".close_MW")

//Объявляем вкладки модального окна
const appearance = document.querySelector(".appearance")
const quest = document.querySelector(".quest")
const gamemode = document.querySelector(".gamemode_MW");


const appearance_content = document.querySelector(".appearance_content")
const quest_content = document.querySelector(".quest_content")
const gamemode_content = document.querySelector(".gamemode_content")


butSettings.addEventListener("click", function(event) {
  modalWindows.style.display = 'flex'
  appearance_content.style.display = 'flex'
  quest_content.style.display = 'none';
  gamemode_content.style.display = 'none';
})


main_0.addEventListener("click", function(event) {
  if (!modalWindows.contains(event.target) && event.target !== butSettings) {
    modalWindows.style.display = 'none';
    appearance.classList.add("active_tab_MW");
    quest.classList.remove("active_tab_MW");
    gamemode.classList.remove("active_tab_MW");
  }
})

close_MW.addEventListener("click", function(event) {
  modalWindows.style.display = 'none';
  appearance.classList.add("active_tab_MW");
  quest.classList.remove("active_tab_MW");
  gamemode.classList.remove("active_tab_MW");
})

//Логика переключений между вкладками


appearance.addEventListener("click", function() {
  appearance.classList.add("active_tab_MW");
  quest.classList.remove("active_tab_MW");
  gamemode.classList.remove("active_tab_MW");

  appearance_content.style.display = 'flex';
  quest_content.style.display = 'none';
  gamemode_content.style.display = 'none';
});

quest.addEventListener("click", function() {
  quest.classList.add("active_tab_MW");
  appearance.classList.remove("active_tab_MW");
  gamemode.classList.remove("active_tab_MW");

  appearance_content.style.display = 'none';
  quest_content.style.display = 'flex';
  gamemode_content.style.display = 'none';
});

gamemode.addEventListener("click", function() {
  quest.classList.remove("active_tab_MW");
  appearance.classList.remove("active_tab_MW");
  gamemode.classList.add("active_tab_MW");

  appearance_content.style.display = 'none';
  quest_content.style.display = 'none';
  gamemode_content.style.display = 'flex';
});


//Логика кнопки сохранить, получение настроек
const kulture_MW = document.querySelector("#kulture")
const mifologia_MW = document.querySelector("#mifologia")
const synce_MW = document.querySelector("#synce")
const world_MW = document.querySelector("#world")

const classick_MW = document.querySelector("#classick")
const light_MW = document.querySelector("#light")

let kulture = true
let mifologia = true
let synce = true
let world = true

let classick = true
let light = false

const save_button_MW = document.querySelector(".save_MW")

save_button_MW.addEventListener("click", function() {
  modalWindows.style.display = 'none';
  appearance.classList.add("active_tab_MW");
  quest.classList.remove("active_tab_MW");
  gamemode.classList.remove("active_tab_MW");

  if (kulture_MW.checked) {
    kulture = true 
  } else {kulture = false}
  if (mifologia_MW.checked) {
    mifologia = true
  } else {mifologia = false}
  if (synce_MW.checked) {
    synce = true
  } else {synce = false}
  if (world_MW.checked) {
    world = true
  } else {world = false}

  if (classick_MW.checked) {
    classick = true
    light = false
    gm_value = classick_MW.getAttribute("value")
    gm_content_table.innerHTML = gm_value
  } else {
    light = true
    classick = false
    gm_value = light_MW.getAttribute("value")
    gm_content_table.innerHTML = gm_value
  }
})

const themeArray = [kulture, mifologia, synce, world]


//Логика самой игры

// Глобальная переменная для хранения вопросов
let correctIndex = null
let questions = [];

// Получаем элементы вопросов
const a_answer = document.querySelector(".a_answer");
const b_answer = document.querySelector(".b_answer");
const c_answer = document.querySelector(".c_answer");
const d_answer = document.querySelector(".d_answer");

const one_answer = document.querySelector(".\\31_answer");
const two_answer = document.querySelector(".\\32_answer");
const three_answer = document.querySelector(".\\33_answer");
const four_answer = document.querySelector(".\\34_answer");

const answers_name = [one_answer, two_answer, three_answer, four_answer];

const answer = document.querySelectorAll(".answer")
const answers_el = document.querySelector(".answers")

const table_quest = document.querySelector(".table_quest");

const num_quest = document.querySelectorAll(".num_quest")
const bar_quest = document.querySelector(".bar_quest")

// Загрузка данных (один раз при старте)
async function loadData(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки файла: ${path}`);
    }
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

// Инициализация данных
async function initQuiz(path) {
  questions = await loadData(path);
  if (!questions.length) {
    console.log("Файл пуст или не загружен");
  }
}

// Перемешиваем массив
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Получаем случайный вопрос и удаляем его из массива
function getRandomQuestion() {
  if (!questions.length) {
    console.log("Все вопросы использованы");
    return null;
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];

  questions.splice(randomIndex, 1);

  return question;
}

// Обработка вопроса
function processQuestion(question) {
  const { text, complexity, options, correct } = question;
  const answers = Object.entries(options);

  // Перемешиваем варианты ответов
  const shuffledAnswers = shuffleArray(answers);

  // Извлекаем ответы и их ключи
  const [first, second, third, fourth] = shuffledAnswers;
  const [firstKey, firstAnswer] = first;
  const [secondKey, secondAnswer] = second;
  const [thirdKey, thirdAnswer] = third;
  const [fourthKey, fourthAnswer] = fourth;

  // Новый правильный ответ
  correctIndex = shuffledAnswers.findIndex(([key]) => key === correct) + 1;

  console.log(`Вопрос: ${text}`);
  console.log(`Сложность: ${complexity}`);
  console.log(`1: ${firstAnswer}`);
  console.log(`2: ${secondAnswer}`);
  console.log(`3: ${thirdAnswer}`);
  console.log(`4: ${fourthAnswer}`);
  console.log(`Правильный ответ: ${correctIndex}`);

  a_answer.innerHTML = `A: ${firstAnswer}`;
  b_answer.innerHTML = `B: ${secondAnswer}`;
  c_answer.innerHTML = `C: ${thirdAnswer}`;
  d_answer.innerHTML = `D: ${fourthAnswer}`;
  table_quest.innerHTML = text;
}

// Старт игры
function startQuiz() {
  const question = getRandomQuestion();
  if (question) {
    processQuestion(question);
  } else {
    console.log("Все вопросы использованы");
  }
}

  //Переключение на игру

    const button_play = document.querySelector(".play")
    const button_block = document.querySelector(".button_block")
    const table_info = document.querySelector(".table_info")
    const game_block = document.querySelector(".game_block")
    const page_back = document.querySelector(".back")
    const result_MW = document.querySelector(".result_MW")
    const button_ok_result = document.querySelector(".button_ok_result")
    const res_score = document.querySelector(".res_score")

    //возвращение на глвную страницу по кнопке
    page_back.addEventListener("click", function (e) {
      button_block.style.display = "flex"
      table_info.style.display = "flex"
      game_block.style.display = "none"
      result_MW.style.display = "none"

      answers_el.addEventListener("click", answer_wait)

      answer.forEach((e) => {
        e.classList.remove("answer_true", "answer_wait", "answer_false");
      })
      num_quest.forEach((e, i) => {
        e.classList.remove("active_num_quest")
        if(i == 0) {
          e.classList.add("active_num_quest")
        }
      })
    })

    button_ok_result.addEventListener("click", function(e) {
      button_block.style.display = "flex"
      table_info.style.display = "flex"
      game_block.style.display = "none"
      result_MW.style.display = "none"

      answers_el.addEventListener("click", answer_wait)

      answer.forEach((e) => {
        e.classList.remove("answer_true", "answer_wait", "answer_false");
      })
      num_quest.forEach((e, i) => {
        e.classList.remove("active_num_quest")
        if(i == 0) {
          e.classList.add("active_num_quest")
        }
      })
      let p_remove_MW = result_MW.querySelectorAll("p")
      p_remove_MW.forEach((e)=> {
        console
        e.remove()})

        saveUserData()
    })

    //Функция распределения вопросов
    function start_quest_quiz () {
      // Фильтруем массив, оставляя только `true` элементы

      let randomIndex = null

      const trueIndexes = themeArray
      .map((value, index) => value ? index : null)
      .filter(index => index !== null);
      // Проверяем, есть ли `true` элементы
      if (trueIndexes.length > 0) {
      // Случайный индекс среди `true`
         randomIndex = trueIndexes[Math.floor(Math.random() * trueIndexes.length)];
          console.log(`Случайный true: var${randomIndex + 1}`);
          } else {
              console.log("Нет `true` элементов");
            } 
  

      // Вызов функции
      if (randomIndex === 0) {
        (async () => {
          await initQuiz('public/kultura.txt');
          startQuiz();
        })();
      }
      
      if (randomIndex === 1) {
        (async () => {
          await initQuiz('public/mifologia.txt');
          startQuiz();
        })();
      }
      
      if (randomIndex === 2) {
        (async () => {
          await initQuiz('public/science.txt');
          startQuiz();
        })();
      }
      
      if (randomIndex === 3) {
        (async () => {
          await initQuiz('public/world.txt');
          startQuiz();
        })();
      }
    }

    button_play.addEventListener("click", function() {
      button_block.style.display = "none"
      table_info.style.display = "none"
      game_block.style.display = "flex"

      start_quest_quiz()
})
 
//Переключение между вопросами
let result = 0

function answer_wait(e) {
  if (e.target.classList.contains("answer")) {
    e.target.classList.add("answer_wait")
    answers_el.removeEventListener("click", answer_wait)
    if (e.target.classList.contains(`${correctIndex}_answer`)){
      setTimeout(() => {
      e.target.classList.add("answer_true");

      let active_num_quest = bar_quest.querySelector(".active_num_quest")
      if (active_num_quest.innerHTML == 15) {
        result = 10000
        result_MW.style.display = "flex"
        const HTMLTrueRes = `<p>Поздравляем!!!</p> <p>Ваш выйгрыш: ${result}</p>`
        let befor_res_score = res_score.innerHTML
        let after_res_score = +befor_res_score + result
        res_score.innerHTML = after_res_score
        result = after_res_score
        result_MW.insertAdjacentHTML("afterbegin", HTMLTrueRes)

      } else {
        setTimeout(() => {
          e.target.classList.remove("answer_true")
          e.target.classList.remove("answer_wait")
          start_quest_quiz()
          answers_el.addEventListener("click", answer_wait)
        }, 1500)
        
      }   
        let next_active_num_quest = bar_quest.querySelector(`.quest_num_${+active_num_quest.innerHTML + 1}`)
        active_num_quest.classList.remove("active_num_quest")
        next_active_num_quest.classList.add("active_num_quest")

    }, 3000);
    } else {
      setTimeout(() => {
        e.target.classList.add("answer_false");
        answers_name.forEach((answer, index) => {
          if (correctIndex === index + 1) {
            answer.classList.add("answer_true");
          }
        });
        setTimeout(() => {
          active_num_quest = bar_quest.querySelector(".active_num_quest")
          if (active_num_quest.innerHTML <= 5) {
          result = 0
          } else if (active_num_quest.innerHTML <= 7) {
            result = 50
          } else if (active_num_quest.innerHTML <= 10) {
            result = 100
          } else if (active_num_quest.innerHTML <= 12) {
            result = 250
          } else if (active_num_quest.innerHTML <= 15) {
            result = 1000
          }
          result_MW.style.display = "flex"
          const HTMLFalseRes = `<p>К сожелению, Вы проиграли!</p> <p>Ваш выйгрыш: ${result}</p>` 
          let befor_res_score = res_score.innerHTML
          let after_res_score = +befor_res_score + result
          result = after_res_score
          res_score.innerHTML = after_res_score
          result_MW.insertAdjacentHTML("afterbegin", HTMLFalseRes)
        }, 1500)
      }, 3000);
    }
    
  }
}

answers_el.addEventListener("click", answer_wait)


//Сохранение данных пользователя
// Сохранение данных пользователя
let nickInput = document.querySelector(".nick_input");
let avatarData = null;

let avatarInput = document.getElementById("ava");
let imgElement = document.getElementById("avatar-img");
let resultElement = document.querySelector(".res_score");

// Сохранение данных в localStorage
function saveUserData() {
  const userData = {
    nickname: nickInput.value,
    avatar: avatarData,
    score: result,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
}

// Загрузка данных из localStorage
function loadUserData() {
  const savedData = localStorage.getItem("userData");

  if (savedData) {
    const userData = JSON.parse(savedData);

    nickInput.value = userData.nickname;
    avatarData = userData.avatar;
    result = userData.score;

    if (avatarData) {
      imgElement.src = avatarData;
    }

    if (resultElement) {
      resultElement.textContent = result;
    }
  }
}

// Обработчик ввода ника
nickInput.addEventListener("input", function () {
  saveUserData();
});

// Обработчик выбора изображения
avatarInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      avatarData = e.target.result;
      imgElement.src = avatarData;
      saveUserData();
    };

    reader.readAsDataURL(file);
  }
});


// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", loadUserData);
