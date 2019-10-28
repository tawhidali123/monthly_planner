Rails.application.routes.draw do
  resources :expenses
  resources :incomes

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
