export const FormFreelancer = {
  FreelancerId: "freelancerId", // ID của freelancer
  AccountId: "accountId", // ID tài khoản
  Name: "name", // Tên
  Email: "email", // Email
  Password: "password",
  PhoneNumber: "phoneNumber", // Số điện thoại
  Avatar: "avatar", // ID file ảnh đại diện
  StreetAddress: "streetAddress", // Địa chỉ
  CityId: "cityId", // thành phố
  CityIdText: "cityIdText",
  DateOfBirth: "dateOfBirth", // Ngày sinh (dạng chuỗi ISO 8601)
  LevelIdText: "levelIdText", // ID cấp độ freelancer
  LevelId: "levelId", // ID cấp độ freelancer
  TargetTitle: "targetTitle", // Mục tiêu công việc
  Title: "title", // Tiêu đề công việc
  Bio: "bio", // Mô tả bản thân
  IsOpeningForJob: "isOpeningForJob", // Mô tả bản thân
  HourlyRate: "hourlyRate", // Số tiền công mỗi giờ
  HourlyRateReal: "hourlyRateReal", // Số tiền công mỗi giờ sau phí
  Status: "status",
  // Các danh sách liên quan
  Specialties: "specialties", // Danh sách chuyên ngành (mwFreelancerSpecialty)
  Skills: "skills", // Danh sách kỹ năng (mwFreelancerSkill)
  Educations: "educations", // Danh sách học vấn (mwFreelancerEducation)
  WorkingHistories: "workingHistories", // Danh sách lịch sử làm việc (mwFreelancerWorkingHistory)
  Certificates: "certificates", // Danh sách chứng chỉ (mwFreelancerCertificate)
  SkillId: "skillId",
  SkillsText: "skillsText",
};

export const FormSpecialty = {
  SpecialtyId: "specialtyId",
};

export const FormEducation = {
  EducationId: "educationId", // ID giáo dục
  FreelancerId: "freelancerId", // ID freelancer
  SchoolName: "schoolName", // Tên trường
  Degree: "degree", // Bằng cấp
  Major: "major", // Chuyên ngành
  FromDate: "fromDate", // Năm bắt đầu học
  EndDate: "endDate", // Năm tốt nghiệp
  Description: "description", // Mô tả
};

export const FormWorkingHistory = {
  WorkingHistoryId: "workingHistoryId", // ID lịch sử làm việc
  FreelancerId: "freelancerId", // ID freelancer
  CompanyName: "companyName", // Tên công ty
  City: "city", // Thành phố
  CityId: "countryId", // ID quốc gia
  FromDate: "fromDate", // Tháng năm bắt đầu
  EndDate: "endDate", // Tháng năm kết thúc
  IsCurrentlyWorkingHere: "isCurrentlyWorkingHere", // Có đang làm việc tại đây không
  Description: "description", // Mô tả
};

export const FormCertificate = {
  CertificateId: "certificateId", // ID chứng chỉ
  FreelancerId: "freelancerId", // ID freelancer
  Name: "name", // Tên chứng chỉ
  FileAttach: "fileAttach", // File đính kèm
};
