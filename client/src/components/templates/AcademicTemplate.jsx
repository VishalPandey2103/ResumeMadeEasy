import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const AcademicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year] = dateStr.split("-");
        return year;
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 text-[13px] leading-relaxed">
            {/* Header */}
            <header className="text-center pb-3 mb-3 border-b border-gray-300">
                <h1 className="text-[26px] font-semibold tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-0.5 text-[11px] text-gray-700">
                    {data.personal_info?.location && (
                        <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {data.personal_info.location}
                        </span>
                    )}
                    {data.personal_info?.phone && (
                        <span className="flex items-center gap-1">
                            <Phone className="size-3" />
                            {data.personal_info.phone}
                        </span>
                    )}
                    {data.personal_info?.email && (
                        <span className="flex items-center gap-1">
                            <Mail className="size-3" />
                            {data.personal_info.email}
                        </span>
                    )}
                </div>

                <div className="mt-0.5 flex flex-wrap justify-center gap-x-4 gap-y-0.5 text-[11px] text-blue-700">
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                            <Linkedin className="size-3" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                            <Globe className="size-3" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </a>
                    )}
                </div>
            </header>

            <div className="space-y-3.5">
                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-[13px] font-semibold tracking-wide uppercase mb-1" style={{ color: accentColor }}>
                            Education
                        </h2>
                        <div className="pt-0.5 space-y-1">
                            {data.education.map((edu, index) => (
                                <div key={index} className="flex justify-between gap-3">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </p>
                                        {edu.institution && (
                                            <p className="text-[12px] text-gray-700 leading-snug">{edu.institution}</p>
                                        )}
                                    </div>
                                    <div className="text-[11px] text-gray-600 text-right min-w-[110px] leading-snug">
                                        {edu.graduation_date && (
                                            <p className="font-semibold">{formatDate(edu.graduation_date)}</p>
                                        )}
                                        {edu.gpa && (
                                            <p>CGPA: {edu.gpa}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold tracking-wide uppercase mb-1" style={{ color: accentColor }}>
                            Experience
                        </h2>
                        <div className="border-t border-gray-300 pt-2 space-y-2">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">{exp.position}</p>
                                            {exp.company && (
                                                <p className="text-[12px] text-gray-700">{exp.company}</p>
                                            )}
                                        </div>
                                        <div className="text-[11px] text-gray-600 text-right min-w-[100px]">
                                            {exp.start_date && exp.end_date && (
                                                <span>{formatDate(exp.start_date)} - {formatDate(exp.end_date)}</span>
                                            )}
                                            {exp.start_date && !exp.end_date && (
                                                <span>{formatDate(exp.start_date)} - Present</span>
                                            )}
                                            {!exp.start_date && exp.end_date && (
                                                <span>{formatDate(exp.end_date)}</span>
                                            )}
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <ul className="mt-1 list-disc list-inside text-[12px] text-gray-700 space-y-0.5">
                                            {exp.description.split("\n").map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold tracking-wide uppercase mb-1" style={{ color: accentColor }}>
                            Projects
                        </h2>
                        <div className="border-t border-gray-300 pt-2 space-y-3">
                            {data.project.map((proj, index) => (
                                <div key={index}>
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">{proj.name}</p>
                                            {proj.type && (
                                                <p className="text-[11px] text-gray-600">{proj.type}</p>
                                            )}
                                        </div>
                                    </div>
                                    {proj.description && (
                                        <ul className="mt-1 list-disc list-inside text-[12px] text-gray-700 space-y-0.5">
                                            {proj.description.split("\n").map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold tracking-wide uppercase mb-1" style={{ color: accentColor }}>
                            Technical Skills
                        </h2>
                        <div className="border-t border-gray-300 pt-2 text-[12px] text-gray-800">
                            {data.skills.join(" • ")}
                        </div>
                    </section>
                )}

                {/* Professional Summary as Achievements-style section */}
                {data.professional_summary && (
                    <section>
                        <h2 className="text-sm font-semibold tracking-wide uppercase mb-1" style={{ color: accentColor }}>
                            Summary
                        </h2>
                        <div className="border-t border-gray-300 pt-2 text-[12px] text-gray-800 whitespace-pre-line">
                            {data.professional_summary}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default AcademicTemplate;
