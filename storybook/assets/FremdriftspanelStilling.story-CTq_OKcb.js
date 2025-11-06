import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-BKRDZNXg.js";import{w as m,c as E}from"./ContextDecorators-m2C0aHVM.js";import{F as N,A as v}from"./FullførtStilling-BKGjA79B.js";import{R as T}from"./GjenåpneStillingKnapp-OVk6uUtz.js";import{T as D}from"./TilgangskontrollForInnhold-Ce79xqRa.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CqWqv4ei.js";import"./OrganisasjonsnummerAlert-CyVgjPMC.js";import"./VStack-Cor3lLjC.js";import"./BasePrimitive-D6wDJ1Ju.js";import"./List-DJ_cKB5i.js";import"./Link-6OQ1ZwSf.js";import"./KandidatHendelseTag-BQGCGSHc.js";import"./Tag-BbMdOwfh.js";import"./ChatExclamationmark-DZyMaN3C.js";import"./FileXMark-DjIko1xT.js";import"./Trash-DJ9JUCj0.js";import"./HandShakeHeart-BFfmkO36.js";import"./Calendar-BzBLnqNs.js";import"./ThumbUp-DfrVGyDU.js";import"./Table-BrhP77xf.js";import"./util-DK0JTtAX.js";import"./parse-B1i2XOHI.js";import"./getDefaultOptions-BzXjfZcs.js";import"./parseISO-ch9g0eF4.js";import"./index-o5hgtkri.js";import"./index-B40KJ5b4.js";import"./isBefore-DoIdCKq_.js";import"./util-Bjk0GmPL.js";import"./accordion-Defh7X8a.js";import"./index-DQczzpJe.js";import"./index-Dz6NVRwC.js";import"./index-DvUAKwit.js";import"./ChevronDown-C8FQsTIa.js";import"./Box-DphqxNTW.js";import"./Bell-BSk5UG7K.js";import"./PersonChat-DBlLtO4X.js";import"./Eye-nYX3BAS6.js";import"./ProgressBar-DdpgOIZS.js";import"./EyeSlash-Bngg020O.js";import"./CircleSlash-BiEK2YE1.js";import"./Modal-MPIOcSUE.js";import"./floating-ui.react-DpAS_Pzz.js";import"./Date.Input-V2iQ9WC9.js";import"./useFormField-CkZX8Hwz.js";import"./useControllableState-DcIjNWSg.js";import"./Modal.context-7Ywpz0nY.js";import"./Checkbox-CNYTHQBs.js";import"./Fieldset-D-SaEwH7.js";import"./Pencil-ByjS9VNc.js";import"./PersonbrukerTekst-KLgyOFav.js";import"./ClockDashed-CfgjfADj.js";import"./Tasklist-B3kI1cQ6.js";import"./ErrorBoundary-HXNcln5B.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
