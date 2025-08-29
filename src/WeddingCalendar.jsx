import React from "react";
import "./WeddingCalendar.css";

const WeddingCalendar = () => {
  return (
    <div className="calendar-container">
      <h2 className="calendar-title-with-lines font-title text-6xl mb-20">Свадьба состоится</h2>

      <div className="calendar-month">СЕНТЯБРЬ</div>

      <table className="calendar">
        <thead>
          <tr>
            <th>ПН</th>
            <th>ВТ</th>
            <th>СР</th>
            <th>ЧТ</th>
            <th>ПТ</th>
            <th className="red">СБ</th>
            <th className="red">ВС</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td className="red">6</td><td className="red">7</td>
          </tr>
          <tr>
            <td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td className="red">13</td><td className="red">14</td>
          </tr>
          <tr>
            <td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td className="red">20</td><td className="red">21</td>
          </tr>
          <tr>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td className="highlight">
              <div className="ring-wrapper">
                {/* Кольцо */}
                <img
                    src="./engagement-ring-diamond-svgrepo-com.svg"
                    alt="Кольцо"
                />
                {/* Число */}
                <span>25</span>
              </div>
            </td>
            <td>26</td>
            <td className="red">27</td>
            <td className="red">28</td>
          </tr>
          <tr>
            <td>29</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>

      <div className="calendar-date-with-lines">25/09/2025</div>
    </div>
  );
};

export default WeddingCalendar;
