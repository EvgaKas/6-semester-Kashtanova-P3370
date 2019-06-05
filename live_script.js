var kolvo =208;
var legend = [];
var legend_prosh = [];
var articleDiv = document.querySelector("div.heaD");
var timer;
var wasStart=0;
var time_mouse=2000;
var timeInter=400;
var lenght=16;
var kray=kolvo-lenght;
document.querySelector("div.start").addEventListener('mouseup', startI);
document.querySelector("div.one").addEventListener('mouseup', oneI);
document.querySelector("div.random").addEventListener('mouseup', rand);



for(var i=0;i<kolvo;i++)//создание поля
{ 
  legend_prosh[i]=1;
  
  var d=document.createElement('div');
  d.id=i;
  d.className="live";
  d.ert=0;
  d.addEventListener('mouseover', do_die);
  d.addEventListener('mouseout', null_timer);
  d.addEventListener('mouseup', first_condition);
   articleDiv.appendChild(d); 
} 

function first_condition(d)//умертвение клеток до начала итераций
{
  if(wasStart==0)
      d.target.className="dead";
}

function rand() //рандом живых и не живых
{
  for(var i=0;i<kolvo;i++)
    {
      legend_prosh[i]=Math.floor(Math.random()*2);
      if(legend_prosh[i]==0)
        document.getElementById(i).className="dead";
    }
}

function do_die(e) //делаем клетку мертвой касанием
{
  timer=setTimeout(change,time_mouse,e.target);
  e.target.ert=1;
}
function change(d)//изменение цвета клетки 
{
  if(d.ert==1)
    {
      console.log(d.id);
      legend[d.id]=0;
      d.className="dead";
    }    
}
function null_timer(e) //обнуление таймера
{
  e.target.ert=0;
  clearTimeout(timer);
}

function startI(e)//итерация
{
  if(wasStart==0)
    {
      wasStart=1;
      e.target.className="dead";
      var tim=setInterval(oneI,timeInter);
      //setTimeout(function() {clearInterval(tim);alert( 'стоп' );}, 20000);
    }
  
}

function oneI()//начало издевательства над клетками
{
  var z=document.getElementsByClassName("heaD")[0]; 
  for(var i=0;i<kolvo;i++)
       abuse(i);
  star_legend();
      
}
function star_legend()//нынешнее состояния клеток сохраняются для следующей итерации
{
  for(var i=0;i<kolvo;i++)
      legend_prosh[i]=legend[i];
}

function abuse(i)//само издевательство 
{
  var l=document.getElementById(i);
  var j=counting(i);
  if(legend_prosh[i]==0)// мёртвая
    {
      if(j==3)
      {
        legend[i]=1;
        l.className="live";
      }
      else
        legend[i]=0;
      return;
    }
  if(j<2||j>3)//живая
    {
      legend[i]=0;
      l.className="dead";
      return;
    }  
  legend[i]=legend_prosh[i];
}

function counting(i)//считаем соседей
{
  var j=0;
  if(i>lenght-2)
  {
    if(i%lenght!=lenght-1&&legend_prosh[i-(lenght-1)]==1)
        j++;
    if(i>lenght-1&&legend_prosh[i-lenght]==1)
        j++;
    if(i>lenght&&i%lenght!=0&&legend_prosh[i-(lenght+1)]==1)
        j++;
  }
  if(i<kray)
  {
    if(i%lenght!=0&&legend_prosh[i+lenght-1]==1)
        j++;
    if(i<kray-1&&legend_prosh[i+lenght]==1)
        j++;
    if(i<kray-2&&i%lenght!=lenght-1&&legend_prosh[i+lenght+1]==1)
        j++;
  }
  if(i%lenght!=0&&legend_prosh[i-1]==1)
      j++;   
  if(i%lenght!=lenght-1&&legend_prosh[i+1]==1)
        j++;
  return j;
}