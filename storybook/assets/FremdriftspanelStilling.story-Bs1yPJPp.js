import{aq as w,J as I,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,O as y,cP as _}from"./iframe-Bj5Axd2a.js";import{w as m,c as D}from"./ContextDecorators-BNFnTqhy.js";import{F as N,A as v}from"./FullførtStilling-DpxNH6Rv.js";import{R as T}from"./GjenåpneStillingKnapp-BB9uEK-P.js";import{T as A}from"./TilgangskontrollForInnhold-K-Riiihv.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-_P279Ly7.js";import"./OrganisasjonsnummerAlert-CRCkZtle.js";import"./VStack-Dupokvod.js";import"./BasePrimitive-cTR1YpC5.js";import"./List-d0CjXUih.js";import"./Link-WQBFb_AD.js";import"./KandidatHendelseTag-BvMAo_wz.js";import"./Tag-Bnz-8_u2.js";import"./ChatExclamationmark-dFgH5DKp.js";import"./FileXMark-BpCAMeUo.js";import"./Trash-pUZYdyL5.js";import"./HandShakeHeart-C2hjOipz.js";import"./Calendar-C1HI89R9.js";import"./ThumbUp-DCJbsUd4.js";import"./ExclamationmarkTriangle-DiXuGWym.js";import"./Table-CPOhTROf.js";import"./index-nohZSnzY.js";import"./index-B40KJ5b4.js";import"./util-CK_ZSrem.js";import"./DatoVelger-ZClWBwyR.js";import"./useDatepicker-DEXBAdOI.js";import"./useControllableState-Cl8hL-Ro.js";import"./Modal-Cxw77nFT.js";import"./floating-ui.react-lQrPabDz.js";import"./Date.Input-B6M7frCw.js";import"./useFormField-f0voTv_i.js";import"./ChevronDown-DHnTEC1o.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CVS_CXbr.js";import"./Modal.context-C6n_bFcK.js";import"./Popover-6eUUlR8P.js";import"./DismissableLayer-DKDlAsE7.js";import"./startOfMonth-CNet8gb0.js";import"./Select-CS1OuYvd.js";import"./endOfMonth-B_Mj5THu.js";import"./ArrowLeft-B0XCjkAo.js";import"./ArrowRight-NmcC34vS.js";import"./isSameDay-C-Y10aYS.js";import"./Checkbox-CzbELx3A.js";import"./Fieldset-BsnIRf47.js";import"./accordion-CEjT_yvg.js";import"./index-ChOmjwy9.js";import"./index-Y9OTEwhE.js";import"./index-CFaTVJe3.js";import"./Box-CYdCFMw7.js";import"./Bell-BLfpT-iO.js";import"./PersonChat-Cee6CDyh.js";import"./Eye-CMPz-DCY.js";import"./ProgressBar-CDovW_lP.js";import"./useLatestRef-DSwrDrUo.js";import"./ShieldLock-CrqRnrin.js";import"./PadlockLocked-DOuGAOrg.js";import"./EyeSlash-h3VU7l4g.js";import"./CircleSlash-BfVCzmBr.js";import"./Pencil-CTpCGTcA.js";import"./FullførStillingModal-Iyz87ncN.js";import"./PersonbrukerTekst-QidpXdU9.js";import"./ClockDashed-CjE21KI-.js";import"./IkonNavnAvatar-BHoYDAfb.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-xaLfZ1vU.js";import"./ErrorBoundary-BlUXJ-uX.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
