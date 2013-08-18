using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RockPaperScissors
{
    public enum GameResultEnum
    {
        Win,
        Lose,
        Draw
    }

    public class GameState
    {
        public string GameResult { get; set; }
        public int GameResultId { get; set; }
        public int PlayerChoice { get; set; }
        public int ComputerPlayerChoice { get; set; }    

    }

    public partial class _Default : Page
    {
        [ScriptMethod]
        [WebMethod]
        public static GameState PlayUserTurn(int option)
        {
            var resultEnum = GameResultEnum.Win; // always the positive! :)

            var computerChoice = GetRandomValue(1, 4);

            if (option == computerChoice)
                resultEnum = GameResultEnum.Draw;
            else if (option == 1 && computerChoice == 2) // rock vs paper
                resultEnum = GameResultEnum.Lose;
            else if (option == 1 && computerChoice == 3) // rock vs scissors
                resultEnum = GameResultEnum.Win;
            else if (option == 2 && computerChoice == 1) // paper vs rock
                resultEnum = GameResultEnum.Win;
            else if (option == 2 && computerChoice == 3) // paper vs scissors
                resultEnum = GameResultEnum.Lose;
            else if (option == 3 && computerChoice == 1) // scissors vs rock
                resultEnum = GameResultEnum.Lose;
            else if (option == 3 && computerChoice == 2) // scissors vs paper
                resultEnum = GameResultEnum.Win;

            var gs= new GameState
                {
                    ComputerPlayerChoice = GetRandomValue(1, 4),
                    PlayerChoice = option,
                    GameResult = Enum.GetName(typeof(GameResultEnum), resultEnum),
                    GameResultId = (int)resultEnum
                };

            return gs;
        }


        protected void Page_Load(object sender, EventArgs e)
        {
        }

        private static int GetRandomValue(int min, int max)
        {
            var rnd = new Random();
            return rnd.Next(min, max);
        }
    }
}