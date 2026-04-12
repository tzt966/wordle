let correct_answer = "LILJA";
let correct_answer_ja = "かわいいアイドル"
let counter = 0;
let n = 0;

let timer;

let correct_ans_0 = correct_answer.charAt(0);
let correct_ans_1 = correct_answer.charAt(1);
let correct_ans_2 = correct_answer.charAt(2);
let correct_ans_3 = correct_answer.charAt(3);
let correct_ans_4 = correct_answer.charAt(4);

let correct_ans_html = '<span class = "ansbox green">' + correct_ans_0 + '</span><span class = "ansbox green">' + correct_ans_1 + '</span><span class = "ansbox green">' + correct_ans_2 + '</span><span class = "ansbox green">' + correct_ans_3 + '</span><span class = "ansbox green">' + correct_ans_4 + '</span>';

let add1 = document.getElementById("ans1");
let add2 = document.getElementById("ans2");

window.onload = async function load() {
    await loadDictionary();
    rebuildAnswer();
    rebuildpopup();
}

let res = "";
let data = "";
let res_input = "";
let data_input = "";
let dictionary_obj_count = 0;
let dictionary_obj_count_input = 0;
rdnb = 0;

//辞書データ取得
async function loadDictionary() {
    res = await fetch("./dictionary/dictionary.json");
    data = await res.json();
    res_input = await fetch("./dictionary/dictionary_input.json");
    data_input = await res_input.json();

    //jsonオブジェクトの数を取得
    dictionary_obj_count = data.length;
    dictionary_obj_count_input = data_input.length;

    //取得する番号の決定
    rdnb = Math.floor(Math.random() * dictionary_obj_count);

    correct_answer = data[rdnb].English;
    correct_answer_ja = data[rdnb].Japanese;
}

//正答文字列の再計算
function rebuildAnswer() {
    correct_ans_0 = correct_answer.charAt(0);
    correct_ans_1 = correct_answer.charAt(1);
    correct_ans_2 = correct_answer.charAt(2);
    correct_ans_3 = correct_answer.charAt(3);
    correct_ans_4 = correct_answer.charAt(4);
    correct_ans_html = '<span class = "ansbox green">' + correct_ans_0 + '</span><span class = "ansbox green">' + correct_ans_1 + '</span><span class = "ansbox green">' + correct_ans_2 + '</span><span class = "ansbox green">' + correct_ans_3 + '</span><span class = "ansbox green">' + correct_ans_4 + '</span>';
}

//ポップアップで表示する文字列の書き換え
function rebuildpopup() {
    add1.innerHTML = correct_ans_html;
    add2.innerHTML = correct_ans_html;
}

//キーボード
function press(key) {
    let check = (counter + 1) * 5

    let check_2 = n;

    if(n < check) {
        let new_input = "input_" + check_2;
        let input = document.getElementById(new_input);
        input.value += key;
        n++;
    } else {
        check_2 = check - 1;
        let new_input = "input_" + check_2;
        let input = document.getElementById(new_input);
        input.value = input.value.slice(0, -1);
        input.value += key;
    }
}

function backspace() {
    let check_3 = counter * 5;
    let check_id = "input_" + check_3;
    if(document.getElementById(check_id).value === ""){
        return;
    }else{

    n = n - 1;
    let new_input = "input_" + n;
    let input = document.getElementById(new_input);
    input.value = input.value.slice(0, -1);
    }
}

//ユーザの答え
let user_ans_char = "";
let flag = false;

//関数の定義
function wordle() {
    let flag = false;

    //inputboxの中身を取得
    let input_0 = "input_" + (5 *counter);
    let input_1 = "input_" + (5 *counter + 1);
    let input_2 = "input_" + (5 *counter + 2);
    let input_3 = "input_" + (5 *counter + 3);
    let input_4 = "input_" + (5 *counter + 4);

    let user_ans_0 = document.getElementById(input_0).value;
    let user_ans_1 = document.getElementById(input_1).value;
    let user_ans_2 = document.getElementById(input_2).value;
    let user_ans_3 = document.getElementById(input_3).value;
    let user_ans_4 = document.getElementById(input_4).value;

    let user_ans_arr = [user_ans_0, user_ans_1, user_ans_2, user_ans_3, user_ans_4];
    user_ans_char = user_ans_0 + user_ans_1  +  user_ans_2  +  user_ans_3  +  user_ans_4;

    //回答が辞書にあるかどうかを検索
    for (let k = 0; k < dictionary_obj_count_input; k++){
        let checkword = data_input[k].English;
        if (user_ans_char == checkword){
            flag = true;
        }
    }
    
    if(flag === false) {
        document.getElementById("nodic").classList.remove("fadeout");
        document.getElementById("nodic").classList.add("yesshow");


        clearTimeout(timer);
        timer = setTimeout(() => {
            document.getElementById("nodic").classList.add("fadeout");

            setTimeout(() => {
                document.getElementById("nodic").classList.remove("yesshow", "fadeout");
            },200);
        }, 450);
        return;
    }

    let correct_ans_arr = [correct_ans_0, correct_ans_1, correct_ans_2, correct_ans_3, correct_ans_4];

    let correct_ans_amount = 0;

    for (let i = 0; i < 5; i++) {
        let newid = "input_" + (5 * counter + i);
        let keyid = "key_" + user_ans_arr[i];

        let keycolor = "";

        //まず緑かどうか調べる
        if (user_ans_arr[i] == correct_ans_arr[i]) {
            document.getElementById(newid).classList.add("green");

            keycolor = "key_green"
            correct_ans_amount++;
        } else {
            //黄色かどうか調べてみる
            let yellow_flag = false;

            for (let j = 0; j < 5; j++) {
                if(user_ans_arr[i] == correct_ans_arr[j]) {
                    yellow_flag = true;
                    break;
                } 
            }

            if(yellow_flag) {
                document.getElementById(newid).classList.add("yellow");
                keycolor = "key_yellow";
            } else {
                document.getElementById(newid).classList.add("grey");
                keycolor = "key_grey"
            }
        }

        let checkyellow = document.getElementById(keyid).classList.contains("key_yellow");
        let checkgreen = document.getElementById(keyid).classList.contains("key_green");

        if(checkyellow === true){
            if(keycolor === "key_green"){
                document.getElementById(keyid).classList.remove("key_yellow");
                keycolor = "key_green";
            }
        }

        if(checkgreen === true){
            keycolor = "key_green";
        }

        //編集不可にする
        document.getElementById(newid).readOnly = true;
        //キーボードの色を変更
        document.getElementById(keyid).classList.add(keycolor);
    }

    //正解時処理
    if(correct_ans_amount == 5){
        document.querySelectorAll(".key").forEach(button => {
            button.disabled = true;
        });
        clearTimeout(timer);
        timer = setTimeout(() => {
            document.getElementById("correct").classList.add("show");
        }, 2400);
        
        return;
    }

    counter++;

    //不正解処理
    if(counter == 6){
        document.querySelectorAll(".key").forEach(button => {
            button.disabled = true;
        });
        clearTimeout(timer);
        timer = setTimeout(() => {
            document.getElementById("incorrect").classList.add("show");
        }, 2400);
        return;
    }
}


//5文字いれてないと動作しないように
function ok() {
    if(n == (counter + 1) * 5){
        wordle();
    } else {
        document.getElementById("lessletter").classList.remove("fadeout");
        document.getElementById("lessletter").classList.add("yesshow");


        clearTimeout(timer);
        timer = setTimeout(() => {
            document.getElementById("lessletter").classList.add("fadeout");

            setTimeout(() => {
                document.getElementById("lessletter").classList.remove("yesshow", "fadeout");
            },200);
        }, 450);
    }
}

//リセット
async function reset(){
    await loadDictionary();
    await rebuildAnswer();
    rebuildpopup();

    for(let k = 0; k < 30; k++){
        let resetinput = "input_" + k;
        let inputdelete = document.getElementById(resetinput);
        inputdelete.classList.remove("grey");
        inputdelete.classList.remove("yellow");
        inputdelete.classList.remove("green");
        inputdelete.value = "";
    }

    document.querySelectorAll(".key").forEach(button => {
            button.disabled = false;
            button.classList.remove("key_green");
            button.classList.remove("key_yellow");
            button.classList.remove("key_grey");
        });

    document.getElementById("correct").classList.remove("show");
    document.getElementById("incorrect").classList.remove("show");
    
    document.getElementById("correct").classList.add("noshow");
    document.getElementById("incorrect").classList.add("noshow");

    counter = 0;
    n = 0;

}

let submit = document.getElementById("submit");
submit.addEventListener("click", ok);


//正解ウインドウの閉じるボタン
let closebox2 = document.getElementById("close2");
closebox2.addEventListener("change", (event) => {
    if(event.target.checked){
        document.getElementById("incorrect").classList.remove("show");
        document.getElementById("incorrect").classList.add("noshow");
    }
});

let closebox1 = document.getElementById("close1");
closebox1.addEventListener("change", (event) => {
    if(event.target.checked){
        document.getElementById("correct").classList.remove("show");
        document.getElementById("correct").classList.add("noshow");
    }
});