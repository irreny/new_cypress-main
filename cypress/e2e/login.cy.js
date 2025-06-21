import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
         cy.visit('/'); // Войти на сайт
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверка цвета кнопки "Забыли пароль"
           });

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
        });

   it('Верный логин и пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввести корректный логин
        cy.get(main_page.password).type(data.password); // Ввести корректный пароль
        cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"
        cy.get(result_page.title).contains('Авторизация прошла успешно').should('be.visible'); // Видна результирующая надпись
    })

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажать "Забыли пароль"
        cy.get(recovery_password_page.email).type(data.login); // Ввести корректный логин
        cy.get(recovery_password_page.send_button).click(); // Нажать на кнопку "Отправить код"
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail').should('be.visible'); // Видна результирующая надпись
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввести корректный логин
        cy.get(main_page.password).type('iLovebot'); // Ввести некорректный пароль
        cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"
        cy.get(result_page.title).contains('Такого логина или пароля нет').should('be.visible'); // Видна результирующая надпись
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@yabloko.ru'); // Ввести некорректный логин
        cy.get(main_page.password).type(data.password); // Ввести корректный пароль
        cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"
        cy.get(result_page.title).contains('Такого логина или пароля нет').should('be.visible'); // Видна результирующая надпись
    })

    it('Проверка валидации логина', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввести невалидный логин
        cy.get(main_page.password).type(data.password); // Ввести корректный пароль
        cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"
        cy.get(result_page.title).contains('Нужно исправить проблему валидации').should('be.visible'); // Видна результирующая надпись
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввести корректный логин с буквами под разным регистром
        cy.get(main_page.password).type(data.password); // Ввести корректный пароль
        cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"
        cy.get(result_page.title).contains('Авторизация прошла успешно').should('be.visible'); // Видна результирующая надпись
    })
})
