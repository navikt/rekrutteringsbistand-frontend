import{aq as I,J as w,j as t,R as k,S as j,cA as x,cJ as b,cI as g,cB as u,O as y,d0 as _}from"./iframe-Dyt_T7m6.js";import{w as m,c as D}from"./ContextDecorators-DMvTp1PY.js";import{F as N,A as v}from"./FullførtStilling-DyX6VC9N.js";import{R as T}from"./GjenåpneStillingKnapp-BDetimNp.js";import{T as A}from"./TilgangskontrollForInnhold-Mc4gVg9z.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BmQ3_LZW.js";import"./OrganisasjonsnummerAlert-DTZjl3VS.js";import"./VStack-DWc1CUQh.js";import"./BasePrimitive-C1_093tT.js";import"./List-Bt7-k4HX.js";import"./Link-BCv8MBzM.js";import"./KandidatHendelseTag-Y0mgIzOj.js";import"./Tag-D4Y1Cqw5.js";import"./ChatExclamationmark-BVdSPkea.js";import"./FileXMark-DoKWH1ss.js";import"./Trash-DZwPj-5f.js";import"./HandShakeHeart-DPccg_IV.js";import"./Calendar-CeSAK0Un.js";import"./ThumbUp-Dzc_N9Xd.js";import"./ExclamationmarkTriangle-BdW4S9lt.js";import"./Table-BuuVOVox.js";import"./index-BRPiLR4n.js";import"./index-B40KJ5b4.js";import"./util-DIY1dJO9.js";import"./DatoVelger-COLFcPcN.js";import"./useDatepicker-D99uBoqY.js";import"./useControllableState-eGZPEQXj.js";import"./Modal-CJJnMamE.js";import"./floating-ui.react-3SqnOr-M.js";import"./Date.Input-CBzSduVo.js";import"./useFormField-dlOh0Y30.js";import"./ChevronDown-B0uTgkqP.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Ckgmqoa4.js";import"./Modal.context-BfInQaLM.js";import"./Popover-DIA0-Xf2.js";import"./DismissableLayer-C1EC1IHS.js";import"./startOfMonth-IEKYH0WM.js";import"./Select-CbWk1IBX.js";import"./endOfMonth-CT_BzNAr.js";import"./ArrowLeft-DEwRSOPr.js";import"./ArrowRight-uuPyMkII.js";import"./isSameDay-DI5VtCD9.js";import"./Checkbox-BpnhzdiY.js";import"./Fieldset-DDT0hfOG.js";import"./accordion-NkD-qZxe.js";import"./index-DlVZEKJ4.js";import"./index-CUoatXBa.js";import"./index-CsZ3RzvZ.js";import"./Box-BoQed-Hf.js";import"./Bell-CkoWOdJ-.js";import"./PersonChat-BIaxMZy9.js";import"./Eye-BfgmKccz.js";import"./ProgressBar-BNAoELqc.js";import"./useLatestRef-DXwQ7Qir.js";import"./ShieldLock-DaOXE5io.js";import"./PadlockLocked-B0PD_DPf.js";import"./EyeSlash-CHsaCk8W.js";import"./CircleSlash-2likqTnr.js";import"./Pencil-Coe4K03a.js";import"./FullførStillingModal-DnXFpORF.js";import"./PersonbrukerTekst-BIqAgOZe.js";import"./ClockDashed-DvIf0jdv.js";import"./IkonNavnAvatar-Dycz9zXo.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CuoelHoc.js";import"./ErrorBoundary-Bn4sXarN.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
