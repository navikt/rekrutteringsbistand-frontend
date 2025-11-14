import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-B4tn9iAN.js";import{w as m,c as A}from"./ContextDecorators-CoWaYXcV.js";import{F as N,A as v}from"./FullførtStilling-DA-h9VxA.js";import{R as T}from"./GjenåpneStillingKnapp-VB_y67AM.js";import{T as E}from"./TilgangskontrollForInnhold-BIchpmAr.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BfzvtQ6n.js";import"./OrganisasjonsnummerAlert-BSDE_l1X.js";import"./VStack-MIN_AJvI.js";import"./BasePrimitive-7zT0f-d9.js";import"./List-Bom0P9CA.js";import"./Link-CjNaC0Mm.js";import"./KandidatHendelseTag-CtnPwZg2.js";import"./Tag-CM4YJnHT.js";import"./ChatExclamationmark-CwcVnQEA.js";import"./FileXMark-BuZwU9yz.js";import"./Trash-CwDSnh0J.js";import"./HandShakeHeart-DUvF352I.js";import"./Calendar-CsFSA24o.js";import"./ThumbUp-CwjBLOrD.js";import"./Table-DwR1QuxA.js";import"./util-USYhdgOo.js";import"./parse-D9DFnrdL.js";import"./getDefaultOptions-LHoMVmWr.js";import"./parseISO-ClbEW8sT.js";import"./index-CNWXVBIo.js";import"./index-B40KJ5b4.js";import"./isBefore-BQtY6-NU.js";import"./util-B2JlJp7q.js";import"./accordion-oxicvhci.js";import"./index-BJtDBicc.js";import"./index-DtUwAtv6.js";import"./index-CyhWJfFd.js";import"./ChevronDown-CBGI7YRG.js";import"./Box-DE40C6iI.js";import"./Bell-Ca9iwhwk.js";import"./PersonChat-C5ygjhLv.js";import"./Eye-BSJCloCh.js";import"./ProgressBar-Dy1jfDu5.js";import"./EyeSlash-BCvklhYs.js";import"./CircleSlash-C2jbaSqH.js";import"./Modal-DezPqazB.js";import"./floating-ui.react-DOp8LaL5.js";import"./Date.Input-C1ug36yG.js";import"./useFormField-aLRNU1Ej.js";import"./useControllableState-D36QMu8J.js";import"./Modal.context-B90kyfFI.js";import"./Checkbox-DerA7AvG.js";import"./Fieldset-BRoiR9ys.js";import"./Pencil-o27n51TR.js";import"./PersonbrukerTekst-Ckl_7prn.js";import"./ClockDashed-JfslVR6O.js";import"./Tasklist-DsgKuia0.js";import"./ErrorBoundary-Xu3UvEet.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
