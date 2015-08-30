using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using EdgeJs;
using OpenQA.Selenium;
using OpenQA.Selenium.Extensions;
using OpenQA.Selenium.PhantomJS;
using OpenQA.Selenium.Support.UI;

namespace DotNetBridgeNode
{
    internal class Program
    {
        public static async Task<string> NodeFunc(string name)
        {
            var func = Edge.Func(@"
    return function (data, callback) {
        callback(null, 'Hello, ' + data);
    }
");
            var result = await func(name);
            return result.ToString();
        }

        private static void Main(string[] args)
        {
            //PhantomJSHelper.Init(8888);
            //Thread.Sleep(5000);
            var task = NodeFunc("111");
            var html = "";//GetHtml("http://quote.eastmoney.com/f1.html?code=000002&market=2");

            var html2 = PhantomJSHelper.Fetch("http://quote.eastmoney.com/f1.html?code=000002&market=2", "#box1>ul,#box2>ul,#box3>ul");
            if (html2==html)
            {
                Console.WriteLine("不相等");
            }
            else
            {
                Console.WriteLine("相等");
            }

            Console.WriteLine(task.Result);

            //Task.Factory.StartNew(() =>
            //{
            //    var task = NodeFunc("111");
            //    //var html = GetHtml("http://quote.eastmoney.com/f1.html?code=000002&market=2");

            //    var html2=PhantomJSHelper.Fetch("http://quote.eastmoney.com/f1.html?code=000002&market=2", "#box1>ul,#box2>ul,#box3>ul");
            //    if (true)
            //    {
            //        Console.WriteLine("不相等");
            //    }
            //    else
            //    {
            //        Console.WriteLine("相等");
            //    }

            //    Console.WriteLine(task.Result);
            //});
            Console.ReadKey();
        }

        public static string GetHtml(string url)
        {
            var path =
                Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\Debug\\", "")
                    .Replace("bin\\Relase", "").Replace("DotNetBridgeNode",""))+ @"packages\PhantomJS.2.0.0\tools\phantomjs";
            PhantomJSDriverService phantomJsDriverService = PhantomJSDriverService.CreateDefaultService(path);
            //隐藏命令行工具
            phantomJsDriverService.HideCommandPromptWindow = false;
            phantomJsDriverService.LoadImages = false;
            phantomJsDriverService.IgnoreSslErrors = true;
            phantomJsDriverService.AddArgument("--webdriver-loglevel=ERROR");

            var options = new PhantomJSOptions();
            // Chrome User Agent ( Chrome Version 40.0.2214.94 m ) 
            options.AddAdditionalCapability("phantomjs.page.settings.userAgent",
                "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36");
            using (var driver = new PhantomJSDriver(phantomJsDriverService, options))
            {
                var nav = driver.Navigate();
                nav.GoToUrl(url);
                //nav.GoToUrl("http://quote.eastmoney.com/f1.html?code=000002&market=2");
                var webElements =
                    driver.WaitUntil((x) => x.FindElements(OpenQA.Selenium.Extensions.By.JQuerySelector("#box1>ul,#box2>ul,#box3>ul")));
                if (webElements == null)
                {
                    return string.Empty;
                }
                else
                {
                    return driver.PageSource;
                }
            }
        }
    }

    public static class BrowserExtensions
    {
        public static T WaitUntil<T>(this IWebDriver browser, Func<IWebDriver, T> condition, int timeout = 20)
        {
            var wait = new WebDriverWait(browser, new TimeSpan(0, 0, timeout));
            return wait.Until(condition);
        }
    }

    
}