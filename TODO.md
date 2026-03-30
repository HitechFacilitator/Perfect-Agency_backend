# Perfect Agency Backend TODO

## Current Status
- Scaffolding exists
- Core auth, campaign workflow partial
- Remove all company dependencies per user request

## Step-by-Step Plan

### Phase 1: Clean Company Dependencies (1/12 complete after this)
1. [ ] Delete Company model/controller/router/packModel if company-related.
2. [ ] Edit Models/userModel.js - ensure no company_id.
3. [ ] Edit Models/campaignModel.js - remove company_id field/populate.
4. [ ] Edit Controllers/campaignController.js - remove company_id logic, client filter by created_by.
5. [ ] Edit Controllers/paymentController.js - client payments by their campaigns (created_by).
6. [ ] Edit authController.js - register client no company_id req.
7. [ ] Edit companyRouter.js/mainRouter.js - remove company routes.
8. [ ] Search/replace all company_id refs project-wide, test.

### Phase 2: Core Fixes & Validations
9. [ ] Campaign create: validate services_id.length >=2, populate Service names.
10. [ ] UserModel: add is_verified, verifyToken/Expiry for email verification.

### Phase 3: Missing CRUD & Features
11. [ ] Services: full admin CRUD controller/router.
12. [ ] Payments: full poly (training/service), Flutterwave init/verify (env keys).
13. [ ] Ads: Cloudinary upload (multer, env).
14. [ ] Analytics/Task/Training/Enrollment/Announcement: complete controllers/routers if partial.
15. [ ] Admin: manage users/services/campaigns.

### Phase 4: Server & Test
16. [ ] server.js: full setup, routes, error handler, cors.
17. [ ] Seed script: services, admin user.
18. [ ] Test full workflow end-to-end.

Updated as steps complete.

