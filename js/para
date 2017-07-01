
var app = angular.module('app', []);

app.controller('ctrl', ['$scope', '$http', function($scope, $http) {
   
  $scope.currentCurrency = {
    'code': 'TRY',
    'name': 'TÜRK LİRASI'
  };
  
  $scope.update = function() {
    $http({
      method: 'GET',
      url: 'https://api.fixer.io/latest',
      params: {
        'base': $scope.currentCurrency.code
      }
    }).then(function successCallback(response) {    
      $scope.rates = response.data.rates;
    }, function errorCallback(response) {
      console.error( response );
    });
  };
  
  $scope.update();
  
  $scope.currencies = [
    {
      'code': 'AUD',
      'symbol': 'AU$',
      'name': 'Avustralya Doları'
    },
    {
      'code': 'BGN',
      'symbol': 'BGN',
      'name': 'Bulgar Levası'
    },
    {
      'code': 'BRL',
      'symbol': 'R$',
      'name': 'Brezilya Reali'
    },
    {
      'code': 'CAD',
      'symbol': 'CA$',
      'name': 'Kanada Doları'
    },
    {
      'code': 'CHF',
      'symbol': 'CHF',
      'name': 'İsviçre Frangı'
    },
    {
      'code': 'CNY',
      'symbol': 'CN¥',
      'name': 'Çin Yuan'
    },
    {
      'code': 'CZK',
      'symbol': 'Kč',
      'name': 'Çek Cumhuriyeti Korunası'
    },
    {
      'code': 'DKK',
      'symbol': 'Dkr',
      'name': 'Danimarka Korunası'
    },
    {
      'code': 'EUR',
      'symbol': '€',
      'name': 'Euro'
    },
    {
      'code': 'GBP',
      'symbol': '£',
      'name': 'İngiliz Pound Sterlini'
    },
    {
      'code': 'HKD',
      'symbol': 'HK$',
      'name': 'Hong Kong Doları'
    },
    {
      'code': 'HRK',
      'symbol': 'kn',
      'name': 'Hırvat Kunası'
    },
    {
      'code': 'HUF',
      'symbol': 'Ft',
      'name': 'Macar Forint'
    },
    {
      'code': 'IDR',
      'symbol': 'Rp',
      'name': 'Endonezya Rupisi'
    },
    {
      'code': 'ILS',
      'symbol': '₪',
      'name': 'İsrail Yeni Sheqel'
    },
    {
      'code': 'INR',
      'symbol': 'Rs',
      'name': 'Hint Rupisi'
    },
    {
      'code': 'JPY',
      'symbol': '¥',
      'name': 'Japon Yeni'
    },
    {
      'code': 'KRW',
      'symbol': '₩',
      'name': 'Güney Kore Won'
    },
    {
      'code': 'MXN',
      'symbol': 'MX$',
      'name': 'Meksika Pezosu'
    },
    {
      'code': 'MYR',
      'symbol': 'RM',
      'name': 'Malezya Ringiti'
    },
    {
      'code': 'NOK',
      'symbol': 'Nkr',
      'name': 'Norveç Korunası'
    },
    {
      'code': 'NZD',
      'symbol': 'NZ$',
      'name': 'Yeni Zelanda Doları'
    },
    {
      'code': 'PHP',
      'symbol': '₱',
      'name': 'Filipin Pesosu'
    },
    {
      'code': 'PLN',
      'symbol': 'zł',
      'name': 'Polonya Zlotisi'
    },
    {
      'code': 'RON',
      'symbol': 'RON',
      'name': 'Rumen Leu'
    },
    {
      'code': 'RUB',
      'symbol': 'RUB',
      'name': 'Rus Rublesi'
    },
    {
      'code': 'SEK',
      'symbol': 'Skr',
      'name': 'İsveç Kronu'
    },
    {
      'code': 'SGD',
      'symbol': 'S$',
      'name': 'Singapur Doları'
    },
    {
      'code': 'THB',
      'symbol': '฿',
      'name': 'Tayland Bahtı'
    },
    {
      'code': 'TRY',
      'symbol': 'TL',
      'name': 'TÜRK LİRASI'
    },
    {
      'code': 'USD',
      'symbol': '$',
      'name': 'ABD Doları'
    },
    {
      'code': 'ZAR',
      'symbol': 'R',
      'name': 'Güney Afrika Randı'
    }
  ];
  
}]);
