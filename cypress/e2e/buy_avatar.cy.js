import * as main_page from "../locators/avatar_main.json"
import * as trainer_page from "../locators/avatar_trainer.json"
import * as payment_page from "../locators/avatar_payment.json"

describe('Проверка покупки нового аватара', function () {

    it('Тест на покупку нового аватара для тренера', function () {
         cy.visit('https://pokemonbattle.ru/'); // Зайти на сайт                        
         cy.get(main_page.email).type('USER_LOGIN'); // Ввести корректный логин                 
         cy.get(main_page.password).type('USER_PASSWORD'); // Ввести корректный пароль              
         cy.get(main_page.login_button).click(); // Нажать "войти"               
         cy.wait(2000);
         cy.get(trainer_page.trainer).click(); // Нажать в правом вехнем углу на тренера для перехода на страницу тренера          
         cy.wait(2000);
         cy.get(trainer_page.change_avatar).click(); // В правом блоке выбрать "Смена аватара"
         cy.get(trainer_page.available_avatar).first().click(); // Выбрать первый доступный аватар, нажать "купить"
         cy.get(payment_page.card_number).type('4111111111111111'); // Ввести номер карты                     
         cy.get(payment_page.card_cvv).type('125'); // Ввести cvv код                            
         cy.get(payment_page.card_expire).type('1025'); // Ввести срок действия карты                          
         cy.get(payment_page.card_name).type('german dolnikov'); // Ввести имя карты                          
         cy.get(payment_page.card_button_pay).click(); // Нажать кнопку "Оплатить"    
         cy.get(payment_page.push_number).type('56456'); // Ввести код из пуш или смс                           
         cy.get(payment_page.pay_button).click(); // Нажать кнопку "Оплатить"  
         cy.get(payment_page.title).contains('Покупка прошла успешно').should('be.visible'); // Появилась надпись "Покупка прошла успешно"    
     });
 }) 