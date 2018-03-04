# SilverTimetable2

Jak odpalić:

Na komputerze:
1. npm i
2. npm start <br />
może to troche potrwać (z jakieś max 2 minuty) <br />
zobaczymy w konsoli kod QR lub adres w formie exp://tuip
  
Na telefonie:
1. Instalujemy apke expo ze sklepu na telefonie
2. Łączymy się z lokalną siecią tą samą co nasz komputer

Następnie:
1. W aplikacji expo możemy wybrać opcje by zeskanować kod qr lub wybrać zakładkę explore i w polu wyszukiwania wpisać exp://tuipzkonsoli *
2. Jeśli wszystko jest ok zobaczymy, że w konsoli rozpocznie się "budowanie" projektu (pare sekund)
3. Po zbudowaniu odpali nam się apka na telefonie

---------------
- Jeśli zmienimy coś w kodzie to apka znów się "zbuduje" i odświerzy na telefonie
- W przypadku błędów, zobaczymy je w konsoli na komputerze ale także na telefonie (expo pokazuje dokładnie to samo w formie nakładki nad naszą apką)

*uwaga serwer podpina się pod sieć #1 zazwyczaj ethernet nawet jeśli do sieci lokalnej jesteśmy podpięci siecią np #2 lub #3 itp (np po wifi),
 więc może nam się expo nie chcieć połączyć z naszym serwerem.
