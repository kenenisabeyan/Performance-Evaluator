'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PerformanceEvaluationResult() {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvaluation() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/employee/evaluation-results");
        if (!res.ok) {
          throw new Error('Failed to fetch evaluation results');
        }
        const data = await res.json();
        if (data.success && data.evaluation) {
          setEvaluation(data.evaluation);
        } else {
          setError(data.message || 'No evaluation results found');
        }
      } catch (err) {
        console.error("Error fetching evaluation:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvaluation();
  }, []);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("evaluation-form");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("performance_evaluation.pdf");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading evaluation results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="bg-gray-50 text-gray-600 p-4 rounded-lg border border-gray-200">
          No evaluation results found for your account.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Evaluation Result</h1>
          <p className="text-sm text-gray-500 mt-1">Review your official performance scores below.</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download PDF
        </button>
      </div>

      <div
        id="evaluation-form"
        className="bg-white w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="bg-[#3b41c5] text-white text-center py-6 px-4 relative">
          <Image
            src="/image/astuLogo.png"
            height={80}
            width={80}
            alt="ASTU Logo"
            className="mx-auto w-20 h-20 rounded-full mb-3 border-2 border-white shadow-sm bg-white"
          />
          <h2 className="text-xl font-bold mb-1 tracking-wide">ADAMA SCIENCE AND TECHNOLOGY UNIVERSITY</h2>
          <p className="text-xs opacity-90">1888 | Phone: 0916656489 | Fax: +234890 747 | Email: example@astu.edu.et</p>
          <p className="text-xs italic mt-2 opacity-80">Vice President for Strategic Management and International Relations</p>
        </div>

        <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
          <div className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200 uppercase tracking-wide text-sm">Employee Evaluation Summary</div>
          <div className="p-4 text-center font-semibold text-gray-700 uppercase tracking-wide text-sm">Evaluation Term: Half Year</div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Employee Name</label>
            <div className="border border-gray-200 bg-gray-50 w-full p-2.5 rounded-lg text-gray-800 font-medium">{evaluation.name}</div>
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Type of Work</label>
            <div className="border border-gray-200 bg-gray-50 w-full p-2.5 rounded-lg text-gray-800">{evaluation.work}</div>
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Job Type</label>
            <div className="border border-gray-200 bg-gray-50 w-full p-2.5 rounded-lg text-gray-800">{evaluation.job}</div>
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Year of Evaluation</label>
            <div className="border border-gray-200 bg-gray-50 w-full p-2.5 rounded-lg text-gray-800">{evaluation.year}</div>
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Evaluation Leader</label>
            <div className="border border-gray-200 bg-gray-50 w-full p-2.5 rounded-lg text-gray-800">{evaluation.leader}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Sign</label>
              <div className="border border-gray-200 bg-gray-50 w-full p-2.5 rounded-lg text-gray-800 italic">{evaluation.leaderSign}</div>
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Date</label>
              <div className="border border-gray-200 bg-gray-50 w-full p-2.5 rounded-lg text-gray-800">{evaluation.leaderDate}</div>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-gray-200 bg-gray-50/50">
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Leader Mark (70%)</label>
            <div className="border-l-4 border-indigo-500 bg-white w-full p-3 rounded shadow-sm text-lg font-bold text-gray-800">{evaluation.leaderMark}</div>
          </div>
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Self Mark (5%)</label>
            <div className="border-l-4 border-indigo-500 bg-white w-full p-3 rounded shadow-sm text-lg font-bold text-gray-800">{evaluation.selfMark}</div>
          </div>
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Peer Mark (15%)</label>
            <div className="border-l-4 border-indigo-500 bg-white w-full p-3 rounded shadow-sm text-lg font-bold text-gray-800">{evaluation.peerMark}</div>
          </div>
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Other Mark (10%)</label>
            <div className="border-l-4 border-indigo-500 bg-white w-full p-3 rounded shadow-sm text-lg font-bold text-gray-800">{evaluation.otherMark}</div>
          </div>
        </div>

        <div className="p-6">
          <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Evaluation Summary</label>
          <div className="border border-gray-200 bg-white w-full p-4 rounded-lg text-gray-800 min-h-[100px] mb-6">
            {evaluation.summary || "No summary provided."}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Approver Name</label>
              <div className="border border-gray-200 bg-white w-full p-2.5 rounded-lg text-gray-800">{evaluation.approver || "-"}</div>
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Sign</label>
              <div className="border border-gray-200 bg-white w-full p-2.5 rounded-lg text-gray-800 italic">{evaluation.approverSign || "-"}</div>
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-600 uppercase">Date</label>
              <div className="border border-gray-200 bg-white w-full p-2.5 rounded-lg text-gray-800">{evaluation.approverDate || "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
