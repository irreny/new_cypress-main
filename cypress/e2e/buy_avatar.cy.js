describe('Проверка покупки нового аватара', function () {

    it('Тест на покупку нового аватара для тренера', function () {
         cy.visit('https://pokemonbattle.ru/');                         
         cy.get('input[id="k_email"]').type('USER_LOGIN');                   
         cy.get('input[id="k_password"]').type('USER_PASSWORD');               
         cy.get('button[type="submit"]').click();                
         cy.wait(2000);
         cy.get('.header_card_trainer').click();            
         cy.wait(2000);
         cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); 
         cy.get('.available > button').first().click();   
         cy.get('.card_number').type('5555555544444442');                     
         cy.get('.card_csv').type('125');                             
         cy.get('.card_date').type('1026');                           
         cy.get('.card_name').type('german dolnikov');                           
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     
         cy.get('.threeds_number').type('56456');                            
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   
         cy.contains('Покупка прошла успешно').should('be.visible');     
     });
 }) 