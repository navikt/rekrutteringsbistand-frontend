import{ap as I,I as w,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,N as y,cP as N}from"./iframe-C0RnufXY.js";import{w as m,c as D}from"./ContextDecorators-DSK2hJy6.js";import{F as _,A as v}from"./FullførtStilling-DFBM169B.js";import{R as T}from"./GjenåpneStillingKnapp-qWe9PEXe.js";import{T as A}from"./TilgangskontrollForInnhold--wIBgtHL.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-wB6bumNi.js";import"./OrganisasjonsnummerAlert-BCxdIMXO.js";import"./VStack-BCxO0S0u.js";import"./BasePrimitive-BpW17Mon.js";import"./Box-vRWMR1wU.js";import"./List-DRDq3cqn.js";import"./Link-Byz21SDj.js";import"./KandidatHendelseTag-BBnI298W.js";import"./Tag-DRzUowny.js";import"./ChatExclamationmark-2nn0xS5c.js";import"./FileXMark-BosuBZnb.js";import"./Trash-CjDRZ1Gk.js";import"./HandShakeHeart-GRgLuVNm.js";import"./Calendar-6loLCvZB.js";import"./ThumbUp-C6OwJlt6.js";import"./ExclamationmarkTriangle-QPfihTJi.js";import"./Table-CAsc9rbz.js";import"./index-ieblspgF.js";import"./index-B40KJ5b4.js";import"./util-Of1ExplY.js";import"./DatoVelger-Bly7tcyv.js";import"./useDatepicker-Ca-colcF.js";import"./useControllableState-lgVaH3ap.js";import"./Modal-6e7DLqgD.js";import"./floating-ui.react-CGo4gJhe.js";import"./useFormField-D3T80Yr7.js";import"./ReadMore-eKuiDr1Z.js";import"./ChevronDown-DY2xCSpH.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C6JTGAWP.js";import"./Modal.context-wSuQQ2Dw.js";import"./Popover-CUe2V1LX.js";import"./DismissableLayer-CJroQpy8.js";import"./startOfMonth-B9KNJbus.js";import"./Select-Bbq7YLLW.js";import"./endOfMonth-0OAZXnwT.js";import"./ArrowLeft-BVbSJ53T.js";import"./ArrowRight-Do_nDneo.js";import"./isSameDay-FBEzsKjr.js";import"./Checkbox-Bn8chtR2.js";import"./Fieldset-BUyAtvT2.js";import"./accordion-B8lFkR3Z.js";import"./index-D7Kn-dRw.js";import"./index-B0TpUyNy.js";import"./index-CVqYKbw5.js";import"./ProgressBar-CJeQzACs.js";import"./useValueAsRef-DqwR6BTd.js";import"./Bell-Cv2mvl4Z.js";import"./PersonChat-BH0CtMA0.js";import"./Eye-D9jZYDPq.js";import"./ShieldLock-bG0_P7Aa.js";import"./PadlockLocked-q1GJVQVC.js";import"./EyeSlash-SayNRZ67.js";import"./CircleSlash-D8jCZ0JP.js";import"./Pencil-B-p77gxX.js";import"./FullførStillingModal-wOLFkp5u.js";import"./PersonbrukerTekst-FdzBGsMV.js";import"./ClockDashed-CnT-8ktk.js";import"./IkonNavnAvatar-CwN1JPp1.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-pFPciehO.js";import"./ErrorBoundary-FesV2I-l.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
